import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'
import {
  ConsultarPostulacionesPersistenciaDTO,
  IRepositorioPostulaciones,
  PostulacionOfertaPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioPostulaciones'

export class RepositorioPostulaciones implements IRepositorioPostulaciones {
  public async consultar(peticion: IdentificadorDTO): Promise<ConsultarPostulacionesPersistenciaDTO[]> {
    return [
      {
        uuid: '4cfc2a56-dac3-11eb-8d19-0242ac130003',
        uuidOfertaLaboral: '619a07b2-dac3-11eb-8d19-0242ac130003',
        tituloOferta: 'Desarrollador en Python',
        cargoOferta: 'Desarrollador',
        nombreEmpresa: 'Officium',
        estado: 'en proceso',
        fecha: new Date('06-08-2020'),
        comentario: 'comentario de prueba con los caracteres necesarios',
      },
    ]
 }
  public async crear(
    postulacion: PostulacionOfertaPersistenciaDTO,
  ): Promise<void> {
    return
  }
}
