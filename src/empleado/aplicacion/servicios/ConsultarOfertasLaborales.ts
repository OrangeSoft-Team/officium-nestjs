import { Resultado } from '../../../comun/aplicacion/Resultado'
import { EstadoOferta } from '../../dominio/values/oferta/EstadoOferta'
import { Excepcion } from '../../../comun/dominio/Excepcion'
import { ConsultarOfertasLaboralesDTO } from '../dto/ConsultarOfertasLaborales.dto'
import { OfertaLaboralMapeador } from '../mapeadores/OfertaLaboral.mapeador'
import { IRepositorioOfertaLaboral} from '../puertos/IRepositorioOfertaLaboral'


export class ConsultarOfertasLaborales {
  constructor (
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral, 
    ){}

    public async ejecutar (){
      try{
        //Se listan las ofertas laborales usando el método del repositorio
        const lista = await this.repositorioOfertaLaboral.listar()

        //Se compara lo obtenido con el dominio y se retorna
        let ofertasLaborales = lista.map((listadoOfertas) => OfertaLaboralMapeador.MapConsultaDominioOferta(listadoOfertas))

        //Se filtran las publicaciones activas
        const estadoOfertaPublicado = EstadoOferta.crear('publicado')
        ofertasLaborales = ofertasLaborales.filter((oferta) =>
          oferta.estado.esIgual(estadoOfertaPublicado),
        )

        //Mapeamos para respuesta
        const dtoConsulta = ofertasLaborales.map((listadoOfertas) => OfertaLaboralMapeador.MapConsultaRespuestaOferta(listadoOfertas))
        
        //Se retorna el DTO
        return Resultado.ok<ConsultarOfertasLaboralesDTO[]>(
          dtoConsulta,
        )
      }
      catch(error){
        const err: Excepcion = error
        return Resultado.falla<Excepcion>(err)
      }
    }
}