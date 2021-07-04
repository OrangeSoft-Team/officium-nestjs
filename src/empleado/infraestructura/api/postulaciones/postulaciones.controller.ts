import { Controller, Get, Param } from '@nestjs/common'
import { ServicioPostulaciones } from './postulaciones.service'
import { EmpleadoErrorHttpMapeador } from '../../mapeadores/EmpleadoErrorHttp.mapeador'
import { ExcepcionAplicacion } from '../../../../comun/aplicacion/ExcepcionAplicacion'
import { PostulacionOfertaAPIMapeador } from '../../mapeadores/PostulacionOferta.api.mapeador'
import { ConsultarPostulacionesDTO } from '../../../aplicacion/dto/postulacion/ConsultarPostulaciones.dto'

@Controller('api/empleado/postulaciones')
export class ControladorPostulaciones {
  public constructor(
    private readonly servicioPostulaciones: ServicioPostulaciones,
  ) {}

  @Get(':uuid_empleado')
  public async ConsultarPostulaciones(
    @Param('uuid_empleado') uuidEmpleado: string,
  ) {
    //Creamos el DTO de solicitud
    const dto =
      PostulacionOfertaAPIMapeador.transformarSolicitudHttpConsultarPostulaciones(
        uuidEmpleado,
      )
    // Realizamos la solicitud al servicio
    const solicitud = await this.servicioPostulaciones.ConsultarPostulaciones(
      dto,
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <ExcepcionAplicacion>solicitud.error
      EmpleadoErrorHttpMapeador.manejarExcepcionEmpleado(excepcion, 'GET')
    }

    //En caso de éxito
    return PostulacionOfertaAPIMapeador.ConsultarPostulacionesRespuestaHttp(
      <ConsultarPostulacionesDTO[]>solicitud.valor,
    )
  }
}
