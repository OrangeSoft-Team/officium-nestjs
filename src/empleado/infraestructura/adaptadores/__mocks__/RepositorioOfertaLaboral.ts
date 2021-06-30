import {
  IRepositorioOfertaLaboral,
  ConsultarOfertaLaboralPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioOfertaLaboral'

export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral {
 public async listar(): Promise<ConsultarOfertaLaboralPersistenciaDTO[]> {
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

