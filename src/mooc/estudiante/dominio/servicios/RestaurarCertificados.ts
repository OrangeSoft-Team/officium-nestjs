import { DescripcionCertificado } from "../values/certificado/DescripcionCertificado";
import { FechaExpedicionCertificado } from "../values/certificado/FechaExpedicionCertificado";
import { IdentificadorCertificado } from "../values/certificado/IdentificadorCertificado"
import { TituloCurso } from "../values/curso/TituloCurso";

export interface DatosRestaurarCertificados {
    uuid: IdentificadorCertificado
    titulo: TituloCurso
    fechaExpedicion: FechaExpedicionCertificado
}



export interface DatosRestaurarCertificadoDetalle {
    uuid: IdentificadorCertificado
    titulo: TituloCurso
    fechaExpedicion: FechaExpedicionCertificado
    descripcion: DescripcionCertificado
}