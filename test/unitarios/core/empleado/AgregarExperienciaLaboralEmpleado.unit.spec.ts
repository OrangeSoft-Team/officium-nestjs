import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioAgregarExperienciaLaboralEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioAgregarExperienciaLaboralEmpleado'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Servicio Identificador
jest.mock(
  '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador',
)

// Mock: Bus Eventos
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

// Mock: Repositorio Experiencias Laborales
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales',
)

describe('Unitario - Core/Empleado: Agregar una nueva experiencia laboral para un empleado', () => {
  let mockRepositorioExperienciasLaborales: RepositorioExperienciasLaborales
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockServicioIdentificador: ServicioIdentificador
  let mockBusEventos: BusEventos

  let casoUso: ServicioAgregarExperienciaLaboralEmpleado

  beforeAll(() => {
    mockRepositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockBusEventos = new BusEventos()
    mockServicioIdentificador = new ServicioIdentificador()

    casoUso = new ServicioAgregarExperienciaLaboralEmpleado(
      mockRepositorioExperienciasLaborales,
      mockRepositorioEmpleados,
      mockServicioIdentificador,
      mockBusEventos,
    )

    // Espiamos el mock de eventos para verificar que se publiquen eventos
    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Debe agregar una experiencia laboral al empleado con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
      cargo: 'Asistente',
      nombreEmpresa: 'OrangeSoft',
      fechaInicio: new Date('01-01-2020'),
      fechaFin: new Date('05-05-2020'),
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          datos: {
            idEmpleado: '1',
            idExperiencia: expect.any(String),
          },
          nombre: 'ExperienciaLaboralEmpleadoRegistrada',
          fecha: expect.any(Date),
        },
      ])
    })
  })
})
