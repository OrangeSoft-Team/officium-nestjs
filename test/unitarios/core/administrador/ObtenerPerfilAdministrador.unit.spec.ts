import { ServicioObtenerPerfilAdministrador } from '../../../../src/core/administrador/aplicacion/servicios/ServicioObtenerPerfilAdministrador'
import { AdministradorNoExiste } from '../../../../src/core/administrador/dominio/excepciones/administrador/Administrador.excepciones'
import { RepositorioAdministradores } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores'

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores',
)

const ADMINISTRADOR = {
  id: '1',
  correo: 'admin@officium.com',
  primerNombre: 'José',
  primerApellido: 'Perez',
  cargo: 'Gerente',
}

describe('Unitario - Core/Administrador: Obtener el perfil de un administrador', () => {
  let mockRepositorioAdministradores: RepositorioAdministradores
  let casoUso: ServicioObtenerPerfilAdministrador

  beforeAll(() => {
    mockRepositorioAdministradores = new RepositorioAdministradores()

    casoUso = new ServicioObtenerPerfilAdministrador(
      mockRepositorioAdministradores,
    )
  })

  it('Deberia mostrar la información del perfil de un administrador', () => {
    const resultado = casoUso.ejecutar({ idAdministrador: ADMINISTRADOR.id })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual({
        correoElectronico: ADMINISTRADOR.correo,
        primerNombre: ADMINISTRADOR.primerNombre,
        primerApellido: ADMINISTRADOR.primerApellido,
        cargo: ADMINISTRADOR.cargo,
      })
    })
  })

  it('Deberia rechazar la consulta del perfil debido a que el administrador no existe', () => {
    const resultado = casoUso.ejecutar({ idAdministrador: '0' })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(AdministradorNoExiste)
    })
  })
})
