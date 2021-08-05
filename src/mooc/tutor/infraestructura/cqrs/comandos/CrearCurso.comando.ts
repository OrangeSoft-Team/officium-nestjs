import { CrearCursoApiDTO } from '../../dto/CrearCurso.api.dto'

export class ComandoCrearCurso {
  public constructor(public readonly datos: CrearCursoApiDTO) {}
}
