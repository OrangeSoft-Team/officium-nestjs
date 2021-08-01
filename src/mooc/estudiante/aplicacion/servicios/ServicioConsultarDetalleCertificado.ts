import { IExcepcionAplicacion } from "../../../../comun/aplicacion/IExcepcionAplicacion";
import { IServicioAplicacion } from "../../../../comun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../../comun/aplicacion/Resultado";
import { ConsultarDetalleCertificadoQueryDTO, ConsultarDetalleCertificadoRespuestaDTO } from "../dto/queries/ConsultarDetalleCertificado.query";
import { CertificadoMapeador } from "../mapeadores/Certificado.mapeador";
import { IRepositorioCertificados } from "../puertos/IRepositorioCertificados";

export class ServicioConsultarDetalleCertificado implements IServicioAplicacion {
    public constructor(
        private readonly repositorioCertificados: IRepositorioCertificados,
    ){}

    public async ejecutar(query: ConsultarDetalleCertificadoQueryDTO): Promise<Resultado<any>>{
        try{
            //Busca el certificado en repositorio
            const certificados = await this.repositorioCertificados.consultar(query)

            //Mapea a dominio
            const certificadosDominio = CertificadoMapeador.ConvertirDetalleCertificadoDominio(certificados)

            //Mapea respuesta
            const respuesta = CertificadoMapeador.ConvertirDetalleCertificadoRespuesta(certificadosDominio)
            return Resultado.ok<ConsultarDetalleCertificadoRespuestaDTO>(respuesta)
        }catch(error){
            return Resultado.falla<IExcepcionAplicacion>(error)
        }
    }
}