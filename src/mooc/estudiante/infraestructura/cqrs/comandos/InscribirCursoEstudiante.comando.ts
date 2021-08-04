export class ComandoInscribirCursoEstudiante {
    public constructor(public readonly datos: {
        uuidEstudiante: string
        uuidCurso: string
    }){}
  }