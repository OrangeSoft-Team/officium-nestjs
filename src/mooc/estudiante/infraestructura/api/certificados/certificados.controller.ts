import { Body, Controller, Get, Param } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiBasicAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'
import { Auth } from '../../../../../comun/infraestructura/dto/Auth.dto'
import { QueryConsultarCertificadosEstudiante } from '../../cqrs/queries/ConsultarCertificadosEstudiante.query'
import { QueryConsultarDetalleCertificado } from '../../cqrs/queries/ConsultarDetalleCertificado.query'
import {
  DetalleCertificadoApiDTO,
  ListaCertificadosApiDTO,
} from '../../dto/Certificado.api.dto'
import { CertificadoApiMapeador } from '../../mapeadores/Certificado.api.mapeador'
import { ErroresHttpCertificados } from './certificados.errores'

@Controller('api/empleado/certificado')
export class ControladorCertificados {
  public constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiOkResponse({
    type: ListaCertificadosApiDTO,
    description: 'Se obtuvieron los certificados del empleado correctamente.',
    isArray: true,
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado.',
  })
  public async ConsultarCertificadosEmpleado(@Body() dto: Auth<any>) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarCertificadosEstudiante({
        uuidEstudiante: dto.idUsuario,
      }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCertificados.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return CertificadoApiMapeador.convertirRespuestaListarCertificados(
      solicitud.valor,
    )
  }

  @Get('/:uuid_certificado')
  @ApiTags('Mooc/Empleado')
  @ApiBasicAuth()
  @ApiParam({
    type: 'string',
    name: 'uuid_certificado',
    example: '8c843ed8-19ac-4dcb-90ea-9b9c45f4a738',
  })
  @ApiOkResponse({
    type: DetalleCertificadoApiDTO,
    description:
      'Se obtuvo el detalle del certificado del empleado especificado.',
  })
  @ApiNotFoundResponse({
    description: 'No se ha podido ubicar al empleado o el certificado.',
  })
  public async ConsultarDetalleCertificado(
    @Body() dto: Auth<any>,
    @Param('uuid_certificado') uuid: string,
  ) {
    const solicitud = await this.queryBus.execute(
      new QueryConsultarDetalleCertificado({ uuidCertificado: uuid }),
    )

    // En caso de error
    if (!solicitud.esExitoso) {
      const excepcion = <IExcepcionAplicacion>solicitud.error
      ErroresHttpCertificados.manejarExcepcion(excepcion, 'GET')
    }

    // En caso de exito
    return CertificadoApiMapeador.convertirRespuestaDetalleCurso(
      solicitud.valor,
    )
  }
}
