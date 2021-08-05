import {
  CursoPersistenciaDTO,
  IRepositorioCursos,
 /*  ListadoCursosPersistenciaDTO, */
} from '../../../aplicacion/puertos/IRepositorioCursos'

/* const cursos = [
  {
    uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    titulo: 'Matematica basica',
    estatus: 'ACTIVO',
    fechaCreacion: new Date('09-06-2000'),
  },
] */
const cursos = [{
  uuid: 'ced7609e-6db5-456e-97d8-ab12f28e809e',
  titulo: 'Ingles Avanzado',
  valorDuracion: 2,
  escalaDuracion:'DIA',
  habilidad: [{uuidHabilidad : 1}]
}]

export class RepositorioCursos implements IRepositorioCursos {

  public async existe(idCurso: string): Promise<boolean> {
    return (
      cursos.findIndex((curso) => curso.uuid == idCurso) != -1
    )
  }

   public async crear(datos: CursoPersistenciaDTO): Promise<void> {
    return
  }

  /* public async listar(): Promise<ListadoCursosPersistenciaDTO[]> {
    return cursos
  } */
}
