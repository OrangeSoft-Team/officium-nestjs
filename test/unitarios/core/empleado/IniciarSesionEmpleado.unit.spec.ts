import { ServicioIniciarSesionEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioIniciarSesionEmpleado'
import { AutentificacionEmpleadoInvalida } from '../../../../src/core/empleado/dominio/excepciones/empleado/AutentificacionEmpleadoInvalida'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

describe('Unitario - Core/Empleado: Autentificar datos del empleado', () => {
  let mockRepositorioEmpleados: RepositorioEmpleados

  let casoUso: ServicioIniciarSesionEmpleado

  beforeAll(() => {
    mockRepositorioEmpleados = new RepositorioEmpleados()

    casoUso = new ServicioIniciarSesionEmpleado(mockRepositorioEmpleados)
  })

  it('Debe validar los datos de autentificación del empleado correctamente', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'rsca4321@gmail.com',
      token: '1',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor.id).toBe('1')
    })
  })

  it('Debe arrojar una excepción de autentificación para datos invalidos', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'rsca4321@gmail.com',
      token: '2',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(AutentificacionEmpleadoInvalida)
    })
  })
})
