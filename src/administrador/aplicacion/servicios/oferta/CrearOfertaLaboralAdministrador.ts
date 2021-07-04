import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { CrearOfertaLaboralAdministradorSolicitudDTO } from '../../dto/oferta/CrearOfertaLaboralAdministrador.dto'
import { EmpresaNoExiste } from '../../excepciones/empresa/EmpresaNoExiste'
import { OfertaLaboralAdministradorMapeador } from '../../mapeadores/OfertaLaboralAdministrador.mapeador'
import { IRepositorioEmpresa } from '../../puertos/IRepositorioEmpresa'
import { IRepositorioOfertaLaboral } from '../../puertos/IRepositorioOfertaLaboral'

export class CrearOfertaLaboralAdministrador {
  public constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
    private readonly repositorioEmpresa: IRepositorioEmpresa,
    private readonly servicioIdentificador: IServicioIdentificador,
  ) {}

  public async ejecutar(
    solicitud: CrearOfertaLaboralAdministradorSolicitudDTO,
  ) {
    try {
      // Verificamos si la empresa existe
      const empresaExiste = await this.repositorioEmpresa.existe({
        id: solicitud.idEmpresa,
      })
      if (!empresaExiste.existe)
        throw new EmpresaNoExiste(
          'La empresa no se encuentra registrada en el sistema.',
        )

      // Generamos un identificador para la nueva oferta laboral
      const id = this.servicioIdentificador.generarIdentificador().id

      // Creamos la oferta laboral con el identificador y los datos de la solicitud
      const ofertaLaboral =
        OfertaLaboralAdministradorMapeador.crearEntidadPorSolicitud({
          id,
          ...solicitud,
        })

      // Persistimos la oferta laboral
      await this.repositorioOfertaLaboral.crear(
        OfertaLaboralAdministradorMapeador.transformarEntidadEnPersistencia(
          ofertaLaboral,
          solicitud.idEmpresa,
        ),
      )

      // Si todo sale bien, retornamos un OK
      return Resultado.ok<any>(null)
    } catch (error) {
      // En caso de algun error, obtenemos los datos de la excepcion y los retornamos como FALLA
      const err: Excepcion = error
      return Resultado.falla<Excepcion>(err)
    }
  }
}
