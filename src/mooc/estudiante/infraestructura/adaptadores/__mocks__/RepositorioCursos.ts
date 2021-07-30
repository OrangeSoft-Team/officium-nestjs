import { IRepositorioCursos, ListadoCursosPersistenciaDTO } from '../../../aplicacion/puertos/IRepositorioCursos'

const cursos = [
    {
      uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
      titulo: 'Matematica basica',
      estatus: 'ACTIVO',
      fechaCreacion: new Date('09-06-2000'),
    },
  ]
export class RepositorioCursos implements IRepositorioCursos {
    public async listar(): Promise<ListadoCursosPersistenciaDTO[]>{
            return cursos
    }
}