import { ServicioIniciarSesionAdministrador } from '../../../../src/core/administrador/aplicacion/servicios/ServicioIniciarSesionAdministrador'
import { AutentificacionAdministradorInvalida } from '../../../../src/core/administrador/dominio/excepciones/administrador/AutentificacionAdministradorInvalido'
import { RepositorioAdministradores } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores'

// mock del Repositorio Administradores
jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores',
)

describe('Unitario - Core/Empleador: Autentificar datos del administrador', () => {
  let mockRepositorioAdministradores: RepositorioAdministradores

  let casoUso: ServicioIniciarSesionAdministrador

  beforeAll(() => {
    mockRepositorioAdministradores = new RepositorioAdministradores()

    casoUso = new ServicioIniciarSesionAdministrador(
      mockRepositorioAdministradores,
    )
  })

  it('Debe validar los datos de autentificación del administrador correctamente', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'admin@officium.com',
      token: '1',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor.id).toBe('1')
    })
  })

  it('Debe arrojar una excepción de autentificación para datos invalidos', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'admin@officium.com',
      token: '2',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(AutentificacionAdministradorInvalida)
    })
  })
})
