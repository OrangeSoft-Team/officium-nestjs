import { DatosRestaurarCuestionario } from "../../dominio/servicios/RestaurarCuestionario";
import { DuracionEstimadaCuestionario } from "../../dominio/values/cuestionario/DuracionEstimadaCuestionario";
import { IdentificadorCuestionario } from "../../dominio/values/cuestionario/IdentificadorCuestionario";
import { IntentosPermitidosCuestionario } from "../../dominio/values/cuestionario/IntentosPermitidosCuestionario";
import { ConsultarCuestionarioRespuestaDTO, PreguntasCuestionarioDTO } from "../dto/queries/ConsultarCuestionario.query";
import { ConsultarCuestionarioPersistenciaDTO } from "../puertos/IRepositorioCuestionarios";

export abstract class CuestionarioMapeador {
    public static ConvertirCuestionarioDominio(
        cuestionarioPersistencia: ConsultarCuestionarioPersistenciaDTO
    ): DatosRestaurarCuestionario{
        return{
            uuid: IdentificadorCuestionario.crear(cuestionarioPersistencia.uuid),
            duracionEstimada: DuracionEstimadaCuestionario.crear(
                cuestionarioPersistencia.escalaDuracion as any,
                cuestionarioPersistencia.valorDuracion),
            intentosPermitidos: IntentosPermitidosCuestionario.crear(cuestionarioPersistencia.intentosPermitidos)
        }
    }

    public static ConvertirCuestionarioRespuesta(
        cuestionarioDominio: DatosRestaurarCuestionario,
        preguntas: PreguntasCuestionarioDTO[]
    ): ConsultarCuestionarioRespuestaDTO{
        return {
            uuid: cuestionarioDominio.uuid.obtenerId(),
            valorDuracion: cuestionarioDominio.duracionEstimada.ObtenerDuracionEstimadaValor(),
            escalaDuracion: cuestionarioDominio.duracionEstimada.ObtenerDuracionEstimadaEscala(),
            intentosPermitidos: cuestionarioDominio.intentosPermitidos.obtenerIntentos(),
            preguntasCuestionario: preguntas,
        }
    }
}