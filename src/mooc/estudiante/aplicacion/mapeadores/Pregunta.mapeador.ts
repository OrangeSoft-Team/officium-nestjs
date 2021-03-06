import { DatosRestaurarPreguntas } from "../../dominio/servicios/RestaurarCuestionario"
import { DatosRestaurarRespuestas } from "../../dominio/servicios/RestaurarPreguntas"
import { CorrectoOpcion } from "../../dominio/values/opcion/CorrectoOpcion"
import { IdentificadorOpcion } from "../../dominio/values/opcion/IdentificadorOpcion"
import { ValorOpcion } from "../../dominio/values/opcion/ValorOpcion"
import { EnunciadoPregunta } from "../../dominio/values/pregunta/EnunciadoPregunta"
import { IdentificadorPregunta } from "../../dominio/values/pregunta/IdentificadorPregunta"
import { PonderacionPregunta } from "../../dominio/values/pregunta/PonderacionPregunta"
import { TipoPregunta } from "../../dominio/values/pregunta/TipoPregunta"
import { PreguntasCuestionarioDTO } from "../dto/queries/ConsultarCuestionario.query"
import { PreguntasPersistenciaDTO } from "../puertos/IRepositorioRespuestas"

export abstract class PreguntaMapeador {
    public static ConvertirListaPreguntasDominio(
        preguntas: PreguntasCuestionarioDTO[]
    ): DatosRestaurarPreguntas[] {
        const respuesta: DatosRestaurarPreguntas[] = preguntas?.map((pregunta)=> {
            return {
                uuid: IdentificadorPregunta.crear(pregunta.uuid),
                enunciado: EnunciadoPregunta.crear(pregunta.enunciado),
                tipo: TipoPregunta.crear(pregunta.tipo as any),
                ponderacion: PonderacionPregunta.crear(pregunta.ponderacion),
                opciones: pregunta.opciones.map((opcion)=> {
                    return {
                        uuid: IdentificadorOpcion.crear(opcion.uuid),
                        valor: ValorOpcion.crear(opcion.valor),
                    }
                })
            }
        }) 
        return respuesta
    }


    public static ConvertirRespuestasDominio(
        preguntas: PreguntasPersistenciaDTO[]
    ): DatosRestaurarRespuestas[] {
        const respuesta: DatosRestaurarRespuestas[] = preguntas?.map((pregunta)=> {
            return {
                uuid: IdentificadorPregunta.crear(pregunta.uuid),
                enunciado: EnunciadoPregunta.crear(pregunta.enunciado),
                tipo: TipoPregunta.crear(pregunta.tipo as any),
                ponderacion: PonderacionPregunta.crear(pregunta.ponderacion),
                opciones: pregunta.opciones.map((opcion)=> {
                    return {
                        uuid: IdentificadorOpcion.crear(opcion.uuid),
                        valor: ValorOpcion.crear(opcion.valor),
                        correcto: CorrectoOpcion.crear(opcion.correcto)
                    }
                })
            }
        }) 
        return respuesta
    }
}