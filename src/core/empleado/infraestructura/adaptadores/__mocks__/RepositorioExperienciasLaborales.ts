import {
  ExperienciaLaboralPersitenciaDTO,
  IRepositorioExperienciasLaborales,
} from '../../../aplicacion/puertos/IRepositorioExperienciasLaborales'

const experiencias = [
  {
    id: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    idEmpleado: '1',
    cargo: 'Asistente',
    nombreEmpresa: 'OrangeSoft',
    fechaInicio: new Date('06-06-1999'),
    fechaFin: new Date('09-06-1999'),
  },
]

export class RepositorioExperienciasLaborales
  implements IRepositorioExperienciasLaborales
{
  public async obtenerPorIdEmpleado(
    idEmpleado: string,
  ): Promise<ExperienciaLaboralPersitenciaDTO[]> {
    return experiencias.filter(
      (experiencia) => experiencia.idEmpleado == idEmpleado,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async crear(datos: ExperienciaLaboralPersitenciaDTO): Promise<void> {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async editar(datos: ExperienciaLaboralPersitenciaDTO): Promise<void> {
    return
  }

  public async eliminar(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idExperiencia: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    idEmpleado: string,
  ): Promise<void> {
    return
  }
}
