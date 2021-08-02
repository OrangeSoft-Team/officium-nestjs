import { MapeadorFecha } from "../../../../comun/infraestructura/mapeadores/Fecha.mapeador";
import { ConsultarCertificadoEstudianteRespuestaDTO } from "../../aplicacion/dto/queries/ConsultarCertificadosEstudiante.query";
import { ConsultarDetalleCertificadoRespuestaDTO } from "../../aplicacion/dto/queries/ConsultarDetalleCertificado.query";
import { DetalleCertificadoApiDTO, ListaCertificadosApiDTO } from "../dto/Certificado.api.dto";

export abstract class CertificadoApiMapeador {
    public static convertirRespuestaListarCertificados(
        respuesta: ConsultarCertificadoEstudianteRespuestaDTO[]
    ): ListaCertificadosApiDTO[] {
        const certificados: ListaCertificadosApiDTO[] = respuesta?.map((certificado) => {
            return{
                uuid: certificado.uuid,
                titulo: certificado.titulo,
                fechaExpedicion: MapeadorFecha.formatear(certificado.fechaExpedicion),
            }
        })
        return certificados
    }

    public static convertirRespuestaDetalleCurso(
        respuesta: ConsultarDetalleCertificadoRespuestaDTO
    ): DetalleCertificadoApiDTO {
        return{
            uuid: respuesta.uuid,
            titulo: respuesta.titulo,
            fechaExpedicion: MapeadorFecha.formatear(respuesta.fechaExpedicion),
            descripcion: respuesta.descripcion,
        }
    }
}