import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioActualizarHabilidadesEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioActualizarHabilidadesEmpleado'
import { EmpleadoNoExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/Empleado.excepciones'
import { IdentificadorHabilidadVacio } from '../../../../src/core/empleado/dominio/excepciones/habilidad/IdentificadorHabilidad.excepciones'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioHabilidades } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioHabilidades'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Repositorio Empleado
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Repositorio Habilidades
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioHabilidades',
)

// Mock: Bus Eventos
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

describe('Unitario - Core/Empleado: Actualizar habilidades para un empleado', () => {
  let mockRepositorioHabilidades: RepositorioHabilidades
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockBusEventos: BusEventos

  let casoUso: ServicioActualizarHabilidadesEmpleado

  beforeAll(() => {
    mockRepositorioHabilidades = new RepositorioHabilidades()
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockBusEventos = BusEventos.obtenerInstancia()

    casoUso = new ServicioActualizarHabilidadesEmpleado(
      mockRepositorioEmpleados,
      mockRepositorioHabilidades,
      mockBusEventos,
    )

    // Espiamos el mock de eventos para verificar que se publiquen eventos
    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Debe actualizar los identificadores de las habilidades del empleado', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
      idHabilidades: [
        '455e910e-21d2-4cff-b6e0-1de2731ae4e3',
        '59a3217f-6b85-4671-aa0e-0d585e3270a8',
        'f8aaf1fe-b293-4580-868c-1b51a21489c2',
      ],
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          datos: {
            idEmpleado: '1',
          },
          nombre: 'HabilidadesEmpleadoActualizadas',
          fecha: expect.any(Date),
        },
      ])
    })
  })

  it('Debe rechazar la actualización debido a que no se especificó el id de la habilidad', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
      idHabilidades: [
        '',
        '59a3217f-6b85-4671-aa0e-0d585e3270a8',
        'f8aaf1fe-b293-4580-868c-1b51a21489c2',
      ],
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(IdentificadorHabilidadVacio)
    })
  })

  it('Debe rechazar la actualización debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '2',
      idHabilidades: [
        '455e910e-21d2-4cff-b6e0-1de2731ae4e3',
        '59a3217f-6b85-4671-aa0e-0d585e3270a8',
        'f8aaf1fe-b293-4580-868c-1b51a21489c2',
      ],
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })
})
