import { ApiProperty } from '@nestjs/swagger'

export class DatosInicioSesionEmpleadorApiDTO {
  @ApiProperty({ example: 'orangesoft@gmail.com' })
  correoElectronico: string
  @ApiProperty({ example: '387yH867H8hy76h8h8' })
  token: string
}

export class DatosSesionAutenticadaEmpresaApiDTO {
  @ApiProperty({ example: 'OrangeSoft' })
  nombreEmpresa: string
}
