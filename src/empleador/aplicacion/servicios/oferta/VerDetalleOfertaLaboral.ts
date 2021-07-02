import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../../comun/dominio/Excepcion'
import {
  VerDetalleOfertaLaboralSolicitudDTO,
  VerDetalleOfertaLaboralRespuestaDTO,
} from '../../dto/oferta/VerDetalleOfertaLaboral.dto'
import { EmpresaNoExiste } from '../../excepciones/empresa/EmpresaNoExiste'
import { OfertaLaboralNoExiste } from '../../excepciones/oferta/OfertaLaboralNoExiste'
import { OfertaLaboralMapeador } from '../../mapeadores/OfertaLaboral.mapeador'
import { IRepositorioEmpresa } from '../../puertos/IRepositorioEmpresa'
import { IRepositorioOfertaLaboral } from '../../puertos/IRepositorioOfertaLaboral'

export class VerDetalleOfertaLaboral {
  public constructor(
    private readonly repositorioEmpresa: IRepositorioEmpresa,
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
  ) {}

  public async ejecutar(solicitud: VerDetalleOfertaLaboralSolicitudDTO) {
    try {
      // Verificamos si la empresa existe
      const empresaExiste = await this.repositorioEmpresa.existe({
        id: solicitud.idEmpresa,
      })
      if (!empresaExiste.existe)
        throw new EmpresaNoExiste(
          solicitud.idEmpresa,
          'La empresa no se encuentra registrada en el sistema.',
        )

      // Obtenemos los datos de la oferta laboral de persistencia
      const datos = await this.repositorioOfertaLaboral.obtenerOferta({
        idOfertaLaboral: solicitud.idOferta,
        idEmpresa: solicitud.idEmpresa,
      })

      // Verificamos de la existencia de la oferta laboral
      if (datos?.id != solicitud.idOferta)
        throw new OfertaLaboralNoExiste(
          solicitud.idOferta,
          'Esta empresa no posee ninguna oferta laboral registrada con esos datos.',
        )

      // Verificamos los datos con el dominio
      const oferta =
        OfertaLaboralMapeador.transformarPersistenciaEnEntidad(datos)

      // Preparamos el DTO de respuesta
      const respuesta =
        OfertaLaboralMapeador.transformarEntidadEnRespuestaDetallada(oferta)

      // En caso de que todo salga bien, retornamos un OK con los datos
      return Resultado.ok<VerDetalleOfertaLaboralRespuestaDTO>(respuesta)
    } catch (error) {
      // En caso de error retornamos una FALLA con la excepcion
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
