import { OpcionPreguntaDTO } from '../../aplicacion/dto/comandos/ResponderCuestionario.comando'
import { IdentificadorOpcion } from '../values/opcion/IdentificadorOpcion'
import { DatosRestaurarOpciones } from './RestaurarCuestionario'
import {
  DatosRestaurarOpcionesCorrecto,
  DatosRestaurarRespuestas,
} from './RestaurarPreguntas'

export class VerificarCuestionarioAprobado {
  public static verificar(
    preguntas: DatosRestaurarRespuestas[],
    respuestas: OpcionPreguntaDTO[],
  ): boolean {
    let valorTotal: number = 0
    let valorAcumulado: number = 0

    preguntas.forEach((pregunta) => {
      valorTotal = valorTotal + pregunta.ponderacion.obtenerPonderacion()

      let opcion = pregunta.opciones.find((res) => {
        return res.uuid.esIgual(
          IdentificadorOpcion.crear(
            respuestas.find((obj) => {
              return obj.uuidPregunta == pregunta.uuid.obtenerId()
            }).uuidOpcion,
          ),
        )
      })
      if (opcion) {
        if (opcion.correcto.obtenerCorrecto()) {
          valorAcumulado =
            valorAcumulado + pregunta.ponderacion.obtenerPonderacion()
        }
      }
    })

    return valorAcumulado >= valorTotal / 2 ? true : false
  }
}
