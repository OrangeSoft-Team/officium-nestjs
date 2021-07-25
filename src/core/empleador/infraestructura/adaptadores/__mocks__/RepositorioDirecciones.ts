import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../../aplicacion/puertos/IRepositorioDirecciones'

const idPais = '87bdfa74-ce5c-4e49-bd29-18c977cf2b7b'
const idEstado = 'ba1008db-3c4f-4613-bb5e-71b5c0d444f0'
const idCiudad = '2e079520-97f6-4851-b894-373fa15a1725'
const direccion: DireccionPersistenciaDTO = {
  id: '6a3dca98-801f-453c-9d22-ea0c8484d6ee',
  calleUno: 'Av. La Naranja Exprimida',
  calleDos: 'Edificio Citrico',
  codigoPostal: 'ORANGE',
  idPais,
  idEstado,
  idCiudad,
}

export class RepositorioDirecciones implements IRepositorioDirecciones {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async crear(comando: DireccionPersistenciaDTO): Promise<void> {
    return
  }
  public async obtenerPorId(id: string): Promise<DireccionPersistenciaDTO> {
    return id == direccion.id ? direccion : null
  }
  public async verificarPais(id: string): Promise<boolean> {
    return idPais == id
  }
  public async verificarEstado(
    idePais: string,
    ideEstado: string,
  ): Promise<boolean> {
    return idePais == idPais && ideEstado == idEstado
  }
  public async verificarCiudad(
    ideEstado: string,
    ideCiudad: string,
  ): Promise<boolean> {
    return ideCiudad == idCiudad && ideEstado == idEstado
  }
}
