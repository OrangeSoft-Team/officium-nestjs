import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../../aplicacion/puertos/IRepositorioDirecciones'

const DIRECCION = {
  calleUno: 'Calle Francia',
  calleDos: 'Res. Francisca',
  codigoPostal: '123456',
  idCiudad: 'e4e98e54-ad2e-4f58-a41c-21e01fa66828',
  idEstado: 'f74dfb72-5809-4efd-9f42-021f3314b2c2',
  idPais: 'f50e42ec-f098-46ea-a672-fc3df2d78f3d',
}

export class RepositorioDirecciones implements IRepositorioDirecciones {
  public async obtener(id: string): Promise<DireccionPersistenciaDTO> {
    if (id == 'afb61c15-9b56-41c1-b478-e44d225e5f35')
      return { id, ...DIRECCION }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  crear(comando: DireccionPersistenciaDTO): Promise<void> {
    return
  }
}
