import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioEliminarExperienciaLaboralEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioEliminarExperienciaLaboral'
import { EmpleadoNoExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/Empleado.excepciones'
import { ExperienciaLaboralNoExiste } from '../../../../src/core/empleado/dominio/excepciones/experienciaLaboral/ExperienciaLaboral.excepciones'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Bus Eventos
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

// Mock: Repositorio Experiencias Laborales
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales',
)

describe('Unitario - Core/Empleado: Eliminar una experiencia laboral para un empleado', () => {
  let mockRepositorioExperienciasLaborales: RepositorioExperienciasLaborales
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockBusEventos: BusEventos

  let casoUso: ServicioEliminarExperienciaLaboralEmpleado

  beforeAll(() => {
    mockRepositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockBusEventos = new BusEventos()

    casoUso = new ServicioEliminarExperienciaLaboralEmpleado(
      mockRepositorioExperienciasLaborales,
      mockRepositorioEmpleados,
      mockBusEventos,
    )

    // Espiamos el mock de eventos para verificar que se publiquen eventos
    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Debe eliminar una experiencia laboral del empleado con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
      id: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          datos: {
            idEmpleado: '1',
            idExperiencia: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
          },
          nombre: 'ExperienciaLaboralEmpleadoEliminada',
          fecha: expect.any(Date),
        },
      ])
    })
  })

  it('Debe rechazar la eliminación de la experiencia laboral debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '2',
      id: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })

  it('Debe rechazar la eliminación de la experiencia laboral debido a que esta no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
      id: 'ced7608e-5db6-noex-93d1-ab32f28e809e',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(ExperienciaLaboralNoExiste)
    })
  })
})
