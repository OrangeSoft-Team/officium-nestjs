import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'
import {
  ConsultarPostulacionesPersistenciaDTO,
  IRepositorioPostulaciones,
  PostulacionOfertaPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioPostulaciones'

export class RepositorioPostulaciones implements IRepositorioPostulaciones {
  public async consultar(
    peticion: IdentificadorDTO,
  ): Promise<ConsultarPostulacionesPersistenciaDTO[]> {
    return [
      {
        uuid: '4cfc2a56-dac3-11eb-8d19-0242ac130003',
        uuidOfertaLaboral: '93c91278-dcfd-11eb-ba80-0242ac130004',
        tituloOferta: 'Contador de un taller de motocicletas',
        cargoOferta: 'Contador',
        nombreEmpresa: 'El Perro Motociclon',
        estado: 'en proceso',
        fecha: new Date('06-06-2020'),
        comentario: 'Los jueves tengo que buscar a mi hijo al colegio por lo que puede no cumpla horario',
      },
      {
        uuid: '7aacb9ac-dcfd-11eb-ba80-0242ac130004',
        uuidOfertaLaboral: '7453dc15-7ff2-4c37-9455-de661a5275b1',
        tituloOferta: 'Cajero en cafetería',
        cargoOferta: 'Cajero',
        nombreEmpresa: 'Cof-Cofee',
        estado: 'en proceso',
        fecha: new Date('06-06-2020'),
        comentario: 'necesito 1 café cada 3 horas para funcionar',
      },
    ]
  }
  public async crear(
    postulacion: PostulacionOfertaPersistenciaDTO,
  ): Promise<void> {
    return
  }
}
