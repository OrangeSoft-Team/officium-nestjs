import { Entidad } from '../../../../comun/dominio/Entidad'
import { DuracionEstimadaCuestionario } from '../values/cuestionario/DuracionEstimadaCuestionario'
import { IdentificadorCuestionario } from '../values/cuestionario/IdentificadorCuestionario'
import { IntentosPermitidosCuestionario } from '../values/cuestionario/IntentosPermitidosCuestionario'
import { Pregunta } from './Pregunta'





export interface DatosCuestionario {
  identificador: IdentificadorCuestionario
  duracionEstimada: DuracionEstimadaCuestionario
  intentosPermitidos: IntentosPermitidosCuestionario
  preguntas: Pregunta[]
}

export class Cuestionario extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorCuestionario,
    private duracionEstimada: DuracionEstimadaCuestionario,
    private intentosPermitidos: IntentosPermitidosCuestionario,
    private preguntas: Pregunta[]
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(cuestionario: Cuestionario): boolean {
    return this.identificador.esIgual(cuestionario.obtenerIdentificador())
  }

  public obtenerDuracion() {
    return this.duracionEstimada
  }

  public obtenerIntentos() {
    return this.intentosPermitidos
  }

  public obtenerPreguntas() {
    return this.preguntas
  }

  public static crear(datos: DatosCuestionario): Cuestionario {
    return new Cuestionario(
      datos.identificador,
      datos.duracionEstimada,
      datos.intentosPermitidos,
      datos.preguntas,
    )
  }

  public static restaurar(datos: DatosCuestionario): Cuestionario {
    return new Cuestionario(
        datos.identificador,
        datos.duracionEstimada,
        datos.intentosPermitidos,
        datos.preguntas,
      )
  }
}
