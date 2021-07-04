import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'
import {
  IRepositorioOfertaLaboral,
  ConsultarOfertaLaboralPersistenciaDTO,
  VerDetallesOfertaLaboralPersistenciaDTO,
  IdentificadorOfertaLaboralDTO,
  OfertaLaboralExisteDTO,
} from '../../../aplicacion/puertos/IRepositorioOfertaLaboral'

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public async existe(
    dto: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralExisteDTO> {
    return { existe: dto.idOferta == '79bff1ce-5487-4e57-bb06-3f1b17991271' }
  }

  public async buscarOferta(
    peticion: IdentificadorDTO,
  ): Promise<VerDetallesOfertaLaboralPersistenciaDTO> {
    return {
      id: '93c91278-dcfd-11eb-ba80-0242ac130004',
      titulo: 'Contador de un taller de motocicletas',
      fechaPublicacion: new Date('06-06-2020'),
      fechaModificacion: new Date('06-08-2020'),
      cargo: 'Contador',
      sueldo: 50000,
      descripcion:
        'Se busca persona para llevar cuentas en un taller, con experiencia',
      duracionEstimada: 8,
      escalaDuracion: 'semana',
      turno: 'diurno',
      numeroVacantes: 1,
      estado: 'publicado',
      uuidEmpresa: '35b59754-d9fd-11eb-b8bc-0242ac130003',
      nombreEmpresa: 'El Perro Motociclon',
      calleEmpresa: 'Av el Ejército, callejón Machado',
      codigoPostalEmpresa: '3312',
      ciudadEmpresa: 'Caracas',
    }
  }

  public async listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]> {
    return [
      {
        id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
        titulo: 'Cajero en cafetería',
        fechaPublicacion: new Date('06-06-2020'),
        fechaModificacion: new Date('06-08-2020'),
        cargo: 'Cajero',
        sueldo: 3000,
        descripcion:
          'Se busca Cajero para atender cafetería pequeña, sin necesidad de experiencia.',
        duracionEstimada: 4,
        escalaDuracion: 'mes',
        turno: 'mixto',
        numeroVacantes: 1,
        estado: 'cancelado',
        nombreEmpresa: 'Cof-Cofee',
      },
      {
        id: 'c70ed168-98fe-4438-ad5c-006348a59e41',
        titulo: 'Gerente de frutería',
        fechaPublicacion: new Date('11-09-2020'),
        cargo: 'Gerente',
        sueldo: 10800,
        descripcion:
          'Se busca gerente para un establecimiento de venta de frutas. Requiere experiencia.',
        duracionEstimada: 12,
        escalaDuracion: 'mes',
        turno: 'mixto',
        numeroVacantes: 1,
        estado: 'publicado',
        nombreEmpresa: 'Kiwiiii',
      },
    ]
  }
}
