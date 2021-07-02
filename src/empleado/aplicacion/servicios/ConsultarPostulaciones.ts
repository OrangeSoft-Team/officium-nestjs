import { Resultado } from "../../../comun/aplicacion/Resultado";
import { Excepcion } from "../../../comun/dominio/Excepcion";
import { ConsultarPostulacionesDTO, ConsultarPostulacionesPeticionDTO } from "../dto/ConsultarPostulaciones.dto";
import { EmpleadoNoExiste } from "../excepciones/EmpleadoNoExiste";
import { PostulacionOfertaMapeador } from "../mapeadores/PostulacionOferta.mapeador";
import { IRepositorioEmpleado } from "../puertos/IRepositorioEmpleado";
import { IRepositorioPostulaciones } from "../puertos/IRepositorioPostulaciones";

export class ConsultarPostulaciones{
    constructor(private readonly repositorioPostulaciones: IRepositorioPostulaciones,
                private readonly repositorioEmpleado: IRepositorioEmpleado,
        ){}

    public async ejecutar(peticion: ConsultarPostulacionesPeticionDTO) {
        try{
             //Verificamos que el empleado exista
            const empleadoExiste = await this.repositorioEmpleado.existe({
                id: peticion.uuidEmpleado,
            })
            if (!empleadoExiste.existe)
                throw new EmpleadoNoExiste(
                null,
                'El empleado no se encuentra registrado.',
                )
            //Realizamos peticion a repositorio
            const postulaciones = await this.repositorioPostulaciones.consultar({id: peticion.uuidEmpleado})
            //mapeamos a dominio
            const postulacionesDominio = postulaciones.map((listadoPostulaciones) =>
            PostulacionOfertaMapeador.MapPostulacionDominio(listadoPostulaciones),
            )
            //mapeamos a respuesta 
            const respuesta = postulacionesDominio.map((listadoPostulaciones) =>
            PostulacionOfertaMapeador.MapPostulacionRespuesta(listadoPostulaciones),
            )
            return Resultado.ok<ConsultarPostulacionesDTO[]>(respuesta)
        }
        catch(error){
            return Resultado.falla<Excepcion>(<Excepcion>error)
        }
    }
} 