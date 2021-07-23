import { ServicioConsultarHabilidadesEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioConsultarHabilidadesEmpleado'
import { EmpleadoNoExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/Empleado.excepciones'
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

describe('Unitario - Core/Empleado: Consultar habilidades para un empleado', () => {
  let mockRepositorioHabilidades: RepositorioHabilidades
  let mockRepositorioEmpleados: RepositorioEmpleados

  let casoUso: ServicioConsultarHabilidadesEmpleado

  beforeAll(() => {
    mockRepositorioHabilidades = new RepositorioHabilidades()
    mockRepositorioEmpleados = new RepositorioEmpleados()

    casoUso = new ServicioConsultarHabilidadesEmpleado(
      mockRepositorioEmpleados,
      mockRepositorioHabilidades,
    )
  })

  it('Debe desplegar todos los identificadores de las habilidades del empleado', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual([
        { idHabilidad: '455e910e-21d2-4cff-b6e0-1de2731ae4e3' },
        { idHabilidad: '59a3217f-6b85-4671-aa0e-0d585e3270a8' },
        { idHabilidad: 'f8aaf1fe-b293-4580-868c-1b51a21489c2' },
      ])
    })
  })

  it('Debe rechazar la consulta debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '2',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })
})
