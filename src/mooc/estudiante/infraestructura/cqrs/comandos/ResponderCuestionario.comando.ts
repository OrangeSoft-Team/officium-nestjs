import { OpcionPreguntaDTO } from "../../../aplicacion/dto/comandos/ResponderCuestionario.comando";

export class ComandoResponderCuestionario {
    public constructor(public readonly datos: {
        uuidCurso: string
        uuidCuestionario: string
        uuidEstudiante: string
        respuestasCuestionario: OpcionPreguntaDTO[]
    }){}
  }