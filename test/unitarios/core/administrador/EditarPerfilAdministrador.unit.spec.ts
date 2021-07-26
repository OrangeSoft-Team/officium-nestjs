import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioEditarPerfilAdministrador } from '../../../../src/core/administrador/aplicacion/servicios/ServicioEditarPerfilAdministrador'
import { AdministradorNoExiste } from '../../../../src/core/administrador/dominio/excepciones/administrador/Administrador.excepciones'
import { LongitudInvalidaCargoAdministrador } from '../../../../src/core/administrador/dominio/excepciones/administrador/CargoAdministrador.excepciones'
import { RepositorioAdministradores } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores'

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

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

describe('Unitario - Core/Administrador: Editar el perfil de un administrador', () => {
  let mockRepositorioAdministradores: RepositorioAdministradores
  let mockBusEventos: BusEventos

  let casoUso: ServicioEditarPerfilAdministrador

  beforeAll(() => {
    mockRepositorioAdministradores = new RepositorioAdministradores()
    mockBusEventos = new BusEventos()

    casoUso = new ServicioEditarPerfilAdministrador(
      mockRepositorioAdministradores,
      mockBusEventos,
    )

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Deberia editar el perfil de un administrador con todos los datos validos', () => {
    const resultado = casoUso.ejecutar({
      idAdministrador: ADMINISTRADOR.id,
      cargo: ADMINISTRADOR.cargo,
      primerApellido: ADMINISTRADOR.primerApellido,
      primerNombre: ADMINISTRADOR.primerNombre,
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toBeUndefined()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'PerfilAdministradorActualizado',
          datos: {
            idAdministrador: ADMINISTRADOR.id,
          },
        },
      ])
    })
  })

  it('Deberia rechazar la edición del perfil debido a que el administrador no existe', () => {
    const resultado = casoUso.ejecutar({
      idAdministrador: '0',
      cargo: ADMINISTRADOR.cargo,
      primerApellido: ADMINISTRADOR.primerApellido,
      primerNombre: ADMINISTRADOR.primerNombre,
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(AdministradorNoExiste)
    })
  })

  it('Deberia rechazar la edición del perfil debido a que el cargo tiene una longitud invalida', () => {
    const resultado = casoUso.ejecutar({
      idAdministrador: ADMINISTRADOR.id,
      cargo: 'A',
      primerApellido: ADMINISTRADOR.primerApellido,
      primerNombre: ADMINISTRADOR.primerNombre,
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(LongitudInvalidaCargoAdministrador)
    })
  })
})
