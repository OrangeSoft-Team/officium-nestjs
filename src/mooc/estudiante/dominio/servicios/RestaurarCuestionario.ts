import { DuracionEstimadaCuestionario } from "../values/cuestionario/DuracionEstimadaCuestionario";
import { IdentificadorCuestionario } from "../values/cuestionario/IdentificadorCuestionario";
import { IntentosPermitidosCuestionario } from "../values/cuestionario/IntentosPermitidosCuestionario";
import { IdentificadorOpcion } from "../values/opcion/IdentificadorOpcion";
import { ValorOpcion } from "../values/opcion/ValorOpcion";
import { EnunciadoPregunta } from "../values/pregunta/EnunciadoPregunta";
import { IdentificadorPregunta } from "../values/pregunta/IdentificadorPregunta";
import { PonderacionPregunta } from "../values/pregunta/PonderacionPregunta";
import { TipoPregunta } from "../values/pregunta/TipoPregunta";

export interface DatosRestaurarOpciones{
    uuid: IdentificadorOpcion
    valor: ValorOpcion
}

export interface DatosRestaurarPreguntas {
    uuid: IdentificadorPregunta
    enunciado: EnunciadoPregunta
    tipo: TipoPregunta
    ponderacion: PonderacionPregunta
    opciones: DatosRestaurarOpciones[]
}

export interface DatosRestaurarCuestionario {
    uuid: IdentificadorCuestionario
    duracionEstimada: DuracionEstimadaCuestionario
    intentosPermitidos: IntentosPermitidosCuestionario
}