import { ApiProperty } from '@nestjs/swagger'

export class DatosInicioSesionAdministradorApiDTO {
  @ApiProperty({ example: 'jose@officium.com' })
  correoElectronico: string
  @ApiProperty({ example: '432054389ru43298r7uy432' })
  token: string
}

export class DatosSesionAutenticadaAdministradorApiDTO {
  @ApiProperty({ example: 'José' })
  primerNombre: string
  @ApiProperty({ example: 'Perez' })
  primerApellido: string
}
