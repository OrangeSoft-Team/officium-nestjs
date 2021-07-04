import { Resultado } from '../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../comun/dominio/Excepcion'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'
import {
  VerDetallesOfertaLaboralAdministradorDTO,
  VerDetallesOfertaLaboralAdministradorPeticionDTO,
} from '../dto/VerDetallesOfertaLaboralAdministrador.dto'
import { OfertaLaboralAdministradorMapeador } from '../../aplicacion/mapeadores/OfertaLaboralAdministrador.mapeador'
import { OfertaLaboralNoExiste } from '../excepciones/OfertaLaboralNoExiste'

export class VerDetallesOfertaLaboralAdministrador {
  constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
  ) {}

  public async ejecutar(
    peticion: VerDetallesOfertaLaboralAdministradorPeticionDTO,
  ) {
    try {
      //Se usa el metodo de la interfaz para buscar la oferta
      const datos = await this.repositorioOfertaLaboral.buscarOferta({
        id: peticion.idOferta,
      })

      //Comprobamos si trae registro
      if (datos?.id != peticion.idOferta)
        throw new OfertaLaboralNoExiste(
          'No existe ninguna oferta laboral registrada con esos datos.',
        )

      //Mapeamos al dominio para comprobar los valores con la logica de negocio
      const oferta =
        OfertaLaboralAdministradorMapeador.MapDetalleDominioOferta(datos)

      //Mapeamos nuevamente al formato de respuesta y retornamos
      const respuesta =
        OfertaLaboralAdministradorMapeador.MapDetalleRespuestaOferta(oferta)
      return Resultado.ok<VerDetallesOfertaLaboralAdministradorDTO>(respuesta)
    } catch (error) {
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
