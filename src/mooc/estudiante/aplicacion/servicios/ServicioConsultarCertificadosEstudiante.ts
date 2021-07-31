import { IExcepcionAplicacion } from "../../../../comun/aplicacion/IExcepcionAplicacion";
import { IServicioAplicacion } from "../../../../comun/aplicacion/IServicioAplicacion";
import { Resultado } from "../../../../comun/aplicacion/Resultado";
import { EstudianteNoExiste } from "../../dominio/excepciones/estudiante/Estudiante.excepciones";
import { ConsultarCertificadoEstudianteQueryDTO, ConsultarCertificadoEstudianteRespuestaDTO } from "../dto/queries/ConsultarCertificadosEstudiante";
import { CertificadoMapeador } from "../mapeadores/Certificado.mapeador";
import { IRepositorioCertificados } from "../puertos/IRepositorioCertificados";
import { IRepositorioEstudiantes } from "../puertos/IRepositorioEstudiante";

export class ServicioConsultarCertificadosEstudiante implements IServicioAplicacion {
    public constructor(
        private readonly repositorioCertificados: IRepositorioCertificados,
        private readonly repositorioEstudiantes: IRepositorioEstudiantes
    ){}

    public async ejecutar(query: ConsultarCertificadoEstudianteQueryDTO): Promise<Resultado<any>>{
        try{
            //Busca si el estudiante existe
            const estudianteExiste = this.repositorioEstudiantes.existe(query.uuidEstudiante)
            if (!estudianteExiste)
                throw new EstudianteNoExiste('El estudiante no existe')
            //Busca el certificado en repositorio
            const certificados = await this.repositorioCertificados.listar(query)

            //Mapea a dominio
            const certificadosDominio = CertificadoMapeador.ConvertirListaCertificadosDominio(certificados)

            //Mapea respuesta
            const respuesta = CertificadoMapeador.ConvertirListaCertificadosRespuesta(certificadosDominio)
            return Resultado.ok<ConsultarCertificadoEstudianteRespuestaDTO[]>(respuesta)
        }catch(error){
            return Resultado.falla<IExcepcionAplicacion>(error)
        }
    }
}