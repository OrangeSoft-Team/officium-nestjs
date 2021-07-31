import { Body, Controller, Get } from "@nestjs/common"
import { CommandBus, QueryBus } from "@nestjs/cqrs"
import { IExcepcionAplicacion } from "../../../../../comun/aplicacion/IExcepcionAplicacion"
import { Auth } from "../../../../../comun/infraestructura/dto/Auth.dto"
import { QueryConsultarCertificadosEstudiante } from "../../cqrs/queries/ConsultarCertificadosEstudiante.query"
import { CertificadoApiMapeador } from "../../mapeadores/Certificado.api.mapeador"
import { ErroresHttpCertificados } from "./certificados.errores"

@Controller('api/empleado/certificado')
export class ControladorCertificados {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  public async ConsultarCertificadosEmpleado(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarCertificadosEstudiante({uuidEstudiante: dto.idUsuario}),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCertificados.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return CertificadoApiMapeador.convertirRespuestaListarCertificados(solicitud.valor)
  }
}