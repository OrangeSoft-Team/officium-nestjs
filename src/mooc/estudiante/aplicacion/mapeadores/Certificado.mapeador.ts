import { DatosRestaurarCertificadoDetalle, DatosRestaurarCertificados } from "../../dominio/servicios/RestaurarCertificados";
import { DescripcionCertificado } from "../../dominio/values/certificado/DescripcionCertificado";
import { FechaExpedicionCertificado } from "../../dominio/values/certificado/FechaExpedicionCertificado";
import { IdentificadorCertificado } from "../../dominio/values/certificado/IdentificadorCertificado";
import { TituloCurso } from "../../dominio/values/curso/TituloCurso";
import { ConsultarCertificadoEstudianteRespuestaDTO } from "../dto/queries/ConsultarCertificadosEstudiante.query";
import { ConsultarDetalleCertificadoRespuestaDTO } from "../dto/queries/ConsultarDetalleCertificado.query";
import { CertificadoDetallePersistenciaDTO, CertificadosPersistenciaDTO } from "../puertos/IRepositorioCertificados";

export abstract class CertificadoMapeador {
    public static ConvertirListaCertificadosDominio(
        certificados: CertificadosPersistenciaDTO[]
    ): DatosRestaurarCertificados[]{
       
        const respuesta: DatosRestaurarCertificados[] = certificados?.map((certificado) => {
            return{
                uuid: IdentificadorCertificado.crear(certificado.uuid),
                titulo: TituloCurso.crear(certificado.titulo),
                fechaExpedicion: FechaExpedicionCertificado.crear(certificado.fechaExpedicion),
            }
        })
        return respuesta
    }


    public static ConvertirListaCertificadosRespuesta(
        certificados: DatosRestaurarCertificados[]
    ): ConsultarCertificadoEstudianteRespuestaDTO[]{
        const respuesta: ConsultarCertificadoEstudianteRespuestaDTO[] = certificados?.map((certificado) => {
            return{
                uuid: certificado.uuid.obtenerId(),
                titulo: certificado.titulo.obtenerTitulo(),
                fechaExpedicion: certificado.fechaExpedicion.obtenerFecha(),
            }
        })
        return respuesta
    }

    public static ConvertirDetalleCertificadoDominio(
        certificado: CertificadoDetallePersistenciaDTO
    ): DatosRestaurarCertificadoDetalle{
            return{
                uuid: IdentificadorCertificado.crear(certificado.uuid),
                titulo: TituloCurso.crear(certificado.titulo),
                fechaExpedicion: FechaExpedicionCertificado.crear(certificado.fechaExpedicion),
                descripcion: DescripcionCertificado.crear(certificado.descripcion),
            }
    }

    public static ConvertirDetalleCertificadoRespuesta(
        certificado: DatosRestaurarCertificadoDetalle
    ): ConsultarDetalleCertificadoRespuestaDTO{
            return{
                uuid: certificado.uuid.obtenerId(),
                titulo: certificado.titulo.obtenerTitulo(),
                fechaExpedicion: certificado.fechaExpedicion.obtenerFecha(),
                descripcion: certificado.descripcion.obtenerDescripcion(),
            }
    }
}