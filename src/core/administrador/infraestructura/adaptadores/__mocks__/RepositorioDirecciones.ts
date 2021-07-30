import {
  DireccionPersistenciaDTO,
  IRepositorioDirecciones,
} from '../../../aplicacion/puertos/IRepositorioDirecciones'

const DIRECCIONES: DireccionPersistenciaDTO[] = [
  {
    id: 'b3b78bfb-8ce5-424c-84f6-6b93e9dbd8c2',
    calleUno: 'Av. La Naranja Exprimida',
    calleDos: 'Edificio Tropicana',
    codigoPostal: 'NARANJA',
    idPais: 'f2343ad6-7787-4442-986b-6df5b790f38d',
    idCiudad: '97c9e393-eb94-4642-8a4e-3095419af162',
    idEstado: 'e4cea227-1985-4381-80c7-815c81abcfee',
    nombreCiudad: 'Caracas',
    nombreEstado: 'Distrito Capital',
    nombrePais: 'Venezuela',
  },
]

export class RepositorioDirecciones implements IRepositorioDirecciones {
  public async obtenerPorId(id: string): Promise<DireccionPersistenciaDTO> {
    const indice = DIRECCIONES.findIndex((direccion) => direccion.id == id)
    return DIRECCIONES[indice]
  }
}
