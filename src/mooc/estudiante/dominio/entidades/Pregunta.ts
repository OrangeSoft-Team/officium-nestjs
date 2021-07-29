import { Entidad } from '../../../../comun/dominio/Entidad'
import { EnunciadoPregunta } from '../values/pregunta/EnunciadoPregunta'
import { IdentificadorPregunta } from '../values/pregunta/IdentificadorPregunta'
import { PonderacionPregunta } from '../values/pregunta/PonderacionPregunta'
import { TipoPregunta } from '../values/pregunta/TipoPregunta'
import { Opcion } from './Opcion'



export interface DatosPregunta {
  identificador: IdentificadorPregunta
  enunciado: EnunciadoPregunta
  tipo: TipoPregunta
  poderacion: PonderacionPregunta
  opciones: Opcion[]
}

export class Pregunta extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorPregunta,
    private enunciado: EnunciadoPregunta,
    private tipo: TipoPregunta,
    private poderacion: PonderacionPregunta,
    private opciones: Opcion[]
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(pregunta: Pregunta): boolean {
    return this.identificador.esIgual(pregunta.obtenerIdentificador())
  }

  public obtenerEnunciado() {
    return this.enunciado
  }

  public obtenerTipo() {
    return this.tipo
  }

  public obtenerPonderacion() {
    return this.poderacion
  }

  public obtenerOpciones() {
    return this.opciones
  }

  public static crear(datos: DatosPregunta): Pregunta {
    return new Pregunta(
      datos.identificador,
      datos.enunciado,
      datos.tipo,
      datos.poderacion,
      datos.opciones,
    )
  }

  public static restaurar(datos: DatosPregunta): Pregunta {
    return new Pregunta(
        datos.identificador,
        datos.enunciado,
        datos.tipo,
        datos.poderacion,
        datos.opciones,
    )
  }
}
