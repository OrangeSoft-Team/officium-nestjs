import { CorrectoOpcion } from "../values/opcion/CorrectoOpcion";
import { IdentificadorOpcion } from "../values/opcion/IdentificadorOpcion";
import { ValorOpcion } from "../values/opcion/ValorOpcion";
import { EnunciadoPregunta } from "../values/pregunta/EnunciadoPregunta";
import { IdentificadorPregunta } from "../values/pregunta/IdentificadorPregunta";
import { PonderacionPregunta } from "../values/pregunta/PonderacionPregunta";
import { TipoPregunta } from "../values/pregunta/TipoPregunta";

export interface DatosRestaurarOpcionesCorrecto{
    uuid: IdentificadorOpcion
    valor: ValorOpcion
    correcto: CorrectoOpcion
}

export interface DatosRestaurarRespuestas {
    uuid: IdentificadorPregunta
    enunciado: EnunciadoPregunta
    tipo: TipoPregunta
    ponderacion: PonderacionPregunta
    opciones: DatosRestaurarOpcionesCorrecto[]
}