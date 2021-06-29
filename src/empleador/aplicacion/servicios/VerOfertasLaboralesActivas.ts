import { Resultado } from '../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../comun/dominio/Excepcion'
import { OfertaLaboral } from '../../dominio/OfertaLaboral'
import { EstadoOferta } from '../../dominio/values/oferta/EstadoOferta'
import {
  VerOfertasLaboralesActivasRespuestaDTO,
  VerOfertasLaboralesActivasSolicitudDTO,
} from '../dto/VerOfertasLaborales.dto'
import { EmpresaNoExiste } from '../excepciones/EmpresaNoExiste'
import { VerOfertasLaboralesActivasMapeador } from '../mapeadores/VerOfertasLaboralesActivas.mapeador'
import { IRepositorioEmpresa } from '../puertos/IRepositorioEmpresa'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'

export class VerOfertasLaboralesActivas {
  public constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
    private readonly repositorioEmpresa: IRepositorioEmpresa,
  ) {}

  public async ejecutar(solicitud: VerOfertasLaboralesActivasSolicitudDTO) {
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

      // Obtenemos los datos del repositorio de persistencia
      const datos = await this.repositorioOfertaLaboral.obtenerOfertasEmpresa(
        solicitud,
      )

      // Mapeamos a entidades de dominio
      let ofertasLaborales: OfertaLaboral[] =
        VerOfertasLaboralesActivasMapeador.persitenciaEntidades(datos)

      // Eliminamos las ofertas laborales que no se encuentren activas
      const estadoOfertaPublicado = EstadoOferta.crear('publicado')
      ofertasLaborales = ofertasLaborales.filter((oferta) =>
        oferta.obtenerEstado().esIgual(estadoOfertaPublicado),
      )

      // Mapeamos las entidades al DTO de respuesta
      const dtoRespuesta: VerOfertasLaboralesActivasRespuestaDTO[] =
        VerOfertasLaboralesActivasMapeador.entidadesRespuesta(ofertasLaborales)

      // En caso de exito retornamos el dto
      return Resultado.ok<VerOfertasLaboralesActivasRespuestaDTO[]>(
        dtoRespuesta,
      )
    } catch (error) {
      // En caso de algun error, obtenemos los datos de la excepcion y los retornamos como FALLA
      const err: Excepcion = error
      return Resultado.falla<Excepcion>(err)
    }
  }
}
