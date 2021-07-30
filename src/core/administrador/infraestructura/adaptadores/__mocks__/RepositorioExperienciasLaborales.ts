import {
  ExperienciaLaboralPersistenciaDTO,
  IRepositorioExperienciasLaborales,
} from '../../../aplicacion/puertos/IRepositorioExperienciasLaborales'

type ExperienciaLaboralEmpleado = ExperienciaLaboralPersistenciaDTO & {
  idEmpleado: string
}

const EXPERIENCIAS: ExperienciaLaboralEmpleado[] = [
  {
    id: 'd4425fed-f793-4669-be4f-97ca5d1d3762',
    cargo: 'Gerente',
    nombreEmpresa: 'LimonSoft',
    fechaInicio: new Date('11-15-2020'),
    fechaFin: new Date('12-15-2020'),
    idEmpleado: 'ebdb91e8-3a1e-4672-8261-980ca43d8185',
  },
]

export class RepositorioExperienciasLaborales
  implements IRepositorioExperienciasLaborales
{
  public async obtenerPorIdEmpleado(
    id: string,
  ): Promise<ExperienciaLaboralPersistenciaDTO[]> {
    return EXPERIENCIAS.filter((experiencia) => experiencia.idEmpleado == id)
  }
}
