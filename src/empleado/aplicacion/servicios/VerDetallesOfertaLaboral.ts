import { Resultado } from '../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../comun/dominio/Excepcion'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'
import {
  VerDetallesOfertaLaboralDTO,
  VerDetallesOfertaLaboralPeticionDTO,
} from '../dto/VerDetallesOfertaLaboral.dto'
import { OfertaLaboralMapeador } from '../../aplicacion/mapeadores/OfertaLaboral.mapeador'
import { OfertaLaboralNoExiste } from '../excepciones/OfertaLaboralNoExiste'

export class VerDetallesOfertaLaboral {
  constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
  ) {}

  public async ejecutar(peticion: VerDetallesOfertaLaboralPeticionDTO) {
    try {
      //Se usa el metodo de la interfaz para buscar la oferta
      const datos = await this.repositorioOfertaLaboral.buscarOferta({
        id: peticion.idOferta,
      })

      //Comprobamos si trae registro
      if (datos?.id != peticion.idOferta)
        throw new OfertaLaboralNoExiste(
          peticion.idOferta,
          'No existe ninguna oferta laboral registrada con esos datos.',
        )

      //Mapeamos al dominio para comprobar los valores con la logica de negocio
      const oferta = OfertaLaboralMapeador.MapDetalleDominioOferta(datos)

      //Mapeamos nuevamente al formato de respuesta y retornamos
      const respuesta = OfertaLaboralMapeador.MapDetalleRespuestaOferta(oferta)
      return Resultado.ok<VerDetallesOfertaLaboralDTO>(respuesta)
    } catch (error) {
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
