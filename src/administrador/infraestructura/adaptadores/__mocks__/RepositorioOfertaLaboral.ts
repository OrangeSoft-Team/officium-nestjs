import {
  IdentificadorEmpresaDTO,
  IdentificadorOfertaLaboralDTO,
  IRepositorioOfertaLaboral,
  OfertaLaboralPersistenciaDTO,
  ConsultarOfertaLaboralAdministradorPersistenciaDTO,
  VerDetallesOfertaLaboralAdministradorPersistenciaDTO,
  OfertaLaboralExisteDTO,
} from '../../../aplicacion/puertos/IRepositorioOfertaLaboral'
import { IdentificadorDTO } from '../../../../comun/aplicacion/dto/Identificador.dto'

const ofertas = [
  {
    id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
    titulo: 'Desarrollador en Python',
    fechaPublicacion: new Date('06-06-2020'),
    fechaModificacion: new Date('06-08-2020'),
    cargo: 'Desarrollador',
    sueldo: 50000,
    descripcion:
      'Se busca desarrollador en python moderno con amplios conocimientos en los principios SOLID.',
    duracionEstimada: 1,
    escalaDuracion: 'mes',
    turno: 'diurno',
    numeroVacantes: 1,
    estado: 'cancelado',
    idEmpresa: '1',
  },
  {
    id: 'c70ed168-98fe-4438-ad5c-006348a59e41',
    titulo: 'Conserje a tiempo completo',
    fechaPublicacion: new Date('11-09-2020'),
    cargo: 'Conserje',
    sueldo: 15000,
    descripcion:
      'Se busca conserje a tiempo completo con al menos 2 años de experiencia.',
    duracionEstimada: 12,
    escalaDuracion: 'mes',
    turno: 'mixto',
    numeroVacantes: 1,
    estado: 'publicado',
    idEmpresa: '1',
  },
]

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
  public async obtenerOferta(
    solicitud: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralPersistenciaDTO> {
    const posicion = ofertas.findIndex(
      (oferta) =>
        oferta.id == solicitud.idOfertaLaboral &&
        oferta.idEmpresa == solicitud.idEmpresa,
    )
    return posicion != -1 ? ofertas[posicion] : null
  }

  public async crear(datos: OfertaLaboralPersistenciaDTO): Promise<void> {
    return
  }

  public async existe(
    dto: IdentificadorOfertaLaboralDTO,
  ): Promise<OfertaLaboralExisteDTO> {
    return { existe: dto.idOferta == '79bff1ce-5487-4e57-bb06-3f1b17991271' }
  }

  public async obtenerOfertasEmpresa(
    solicitud: IdentificadorEmpresaDTO,
  ): Promise<OfertaLaboralPersistenciaDTO[]> {
    return ofertas.filter((oferta) => oferta.idEmpresa == solicitud.idEmpresa)
  }

  public async buscarOferta(
    peticion: IdentificadorDTO,
  ): Promise<VerDetallesOfertaLaboralAdministradorPersistenciaDTO> {
    return {
      id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
      titulo: 'Desarrollador en Python',
      fechaPublicacion: new Date('06-06-2020'),
      fechaModificacion: new Date('06-08-2020'),
      cargo: 'Desarrollador',
      sueldo: 50000,
      descripcion:
        'Se busca desarrollador en python moderno con amplios conocimientos en los principios SOLID.',
      duracionEstimada: 1,
      escalaDuracion: 'mes',
      turno: 'diurno',
      numeroVacantes: 1,
      estado: 'publicado',
      uuidEmpresa: '35b59754-d9fd-11eb-b8bc-0242ac130003',
      nombreEmpresa: 'Officium',
      calleEmpresa: 'Av el Ejército, callejón Machado',
      codigoPostalEmpresa: '3312',
      ciudadEmpresa: 'Caracas',
    }
  }

  public async listar(): Promise<
    ConsultarOfertaLaboralAdministradorPersistenciaDTO[]
  > {
    return [
      {
        id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
        titulo: 'Desarrollador en Python',
        fechaPublicacion: new Date('06-06-2020'),
        fechaModificacion: new Date('06-08-2020'),
        cargo: 'Desarrollador',
        sueldo: 50000,
        descripcion:
          'Se busca desarrollador en python moderno con amplios conocimientos en los principios SOLID.',
        duracionEstimada: 1,
        escalaDuracion: 'mes',
        turno: 'diurno',
        numeroVacantes: 1,
        estado: 'cancelado',
        nombreEmpresa: 'Officium',
      },
      {
        id: 'c70ed168-98fe-4438-ad5c-006348a59e41',
        titulo: 'Conserje a tiempo completo',
        fechaPublicacion: new Date('11-09-2020'),
        cargo: 'Conserje',
        sueldo: 15000,
        descripcion:
          'Se busca conserje a tiempo completo con al menos 2 años de experiencia.',
        duracionEstimada: 12,
        escalaDuracion: 'mes',
        turno: 'mixto',
        numeroVacantes: 1,
        estado: 'publicado',
        nombreEmpresa: 'Acme',
      },
    ]
  }
}
