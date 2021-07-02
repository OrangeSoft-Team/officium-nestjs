import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Excepcion } from '../../../../comun/dominio/Excepcion'
import { PostularseOfertaLaboralSolicitudDTO } from '../../dto/postulacion/PostularseOfertaLaboral.dto'
import { EmpleadoNoExiste } from '../../excepciones/empleado/EmpleadoNoExiste'
import { OfertaLaboralNoExiste } from '../../excepciones/oferta/OfertaLaboralNoExiste'
import { PostulacionOfertaMapeador } from '../../mapeadores/PostulacionOferta.mapeador'
import { IRepositorioEmpleado } from '../../puertos/IRepositorioEmpleado'
import { IRepositorioOfertaLaboral } from '../../puertos/IRepositorioOfertaLaboral'
import { IRepositorioPostulaciones } from '../../puertos/IRepositorioPostulaciones'

export class PostularseOfertaLaboral {
  public constructor(
    private readonly servicioIdentificador: IServicioIdentificador,
    private readonly repositorioPostulaciones: IRepositorioPostulaciones,
    private readonly repositorioEmpleado: IRepositorioEmpleado,
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
  ) {}

  public async ejecutar(solicitud: PostularseOfertaLaboralSolicitudDTO) {
    try {
      // Verificamos que la oferta exista
      const ofertaExiste = await this.repositorioOfertaLaboral.existe({
        idOferta: solicitud.idOferta,
      })
      if (!ofertaExiste.existe)
        throw new OfertaLaboralNoExiste(
          null,
          'La oferta laboral no se encuentra registrada.',
        )

      // Verificamos que el empleado exista
      const empleadoExiste = await this.repositorioEmpleado.existe({
        id: solicitud.idEmpleado,
      })
      if (!empleadoExiste.existe)
        throw new EmpleadoNoExiste(
          null,
          'El empleado no se encuentra registrado.',
        )

      // Mapear solicitud de postulación a una entidad de dominio
      const postulacion = PostulacionOfertaMapeador.crearEntidadPorSolicitud(
        solicitud,
        this.servicioIdentificador.generarIdentificador().id,
      )

      // Persistimos la entidad PostulacionOferta a traves del puerto
      await this.repositorioPostulaciones.crear(
        PostulacionOfertaMapeador.transformarEntidadEnPersistencia(
          postulacion,
          solicitud.idEmpleado,
          solicitud.idOferta,
        ),
      )

      // Retornamos un OK al finalizar
      return Resultado.ok<any>(null)
    } catch (error) {
      return Resultado.falla<Excepcion>(<Excepcion>error)
    }
  }
}
