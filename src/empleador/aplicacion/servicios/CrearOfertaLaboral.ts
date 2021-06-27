import { IServicioIdentificador } from '../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../comun/dominio/Excepcion'
import { CrearOfertaLaboralSolicitudDTO } from '../dto/CrearOfertaLaboral.dto'
import { EmpresaNoExiste } from '../excepciones/EmpresaNoExiste'
import { CrearOfertaLaboralMapeador } from '../mapeadores/CrearOfertaLaboral.mapeador'
import { IRepositorioEmpresa } from '../puertos/IRepositorioEmpresa'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'

export class CrearOfertaLaboral {
  public constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
    private readonly repositorioEmpresa: IRepositorioEmpresa,
    private readonly servicioIdentificador: IServicioIdentificador,
  ) {}

  public async ejecutar(solicitud: CrearOfertaLaboralSolicitudDTO) {
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

      // Generamos un identificador para la nueva oferta laboral
      const id = this.servicioIdentificador.generarIdentificador().id

      // Creamos la oferta laboral con el identificador y los datos de la solicitud
      const ofertaLaboral = CrearOfertaLaboralMapeador.solicitudEntidad({
        id,
        ...solicitud,
      })

      // Persistimos la oferta laboral
      await this.repositorioOfertaLaboral.crear(
        CrearOfertaLaboralMapeador.entidadPersistencia(
          ofertaLaboral,
          solicitud.idEmpresa,
        ),
      )

      return Resultado.ok<any>(null)
    } catch (error) {
      const err: Excepcion = error
      return Resultado.falla<Excepcion>(err)
    }
  }
}
