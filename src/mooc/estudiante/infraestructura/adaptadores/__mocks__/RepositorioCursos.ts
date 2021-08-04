import {
  ConsultarCursoPersistenciaDTO,
  CursoPersistenciaDTO,
  InscribirEmpleadoPersistenciaDTO,
  IRepositorioCursos,
  ListadoCursosPersistenciaDTO,
} from '../../../aplicacion/puertos/IRepositorioCursos'

const cursos = [
  {
    uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    titulo: 'Matematica basica',
    estatus: 'ACTIVO',
    fechaCreacion: new Date('09-06-2000'),
  },
]

const curso  = {
  uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
  titulo: 'Matematica basica',
  estatus: 'ACTIVO',
  valorDuracion: 2,
  escalaDuracion:'DIA',
  fechaCreacion: new Date('09-06-2000'),
  fechaUltimaModificacion :new Date('09-06-2020'),
}
export class RepositorioCursos implements IRepositorioCursos {

  public async inscribirEmpleado(comando: InscribirEmpleadoPersistenciaDTO): Promise<void> {
    return
  }

  public async consultar(query: ConsultarCursoPersistenciaDTO): Promise<CursoPersistenciaDTO> {
    return curso
  }
  
  public async listar(): Promise<ListadoCursosPersistenciaDTO[]> {
    return cursos
  }
}
