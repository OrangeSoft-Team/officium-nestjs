import { ApiProperty } from '@nestjs/swagger'

export class DatosBasicosAdministradorApiDTO {
  @ApiProperty({ example: 'miguel@officium.com' })
  correoElectronico: string
  @ApiProperty({ example: 'Miguel' })
  primerNombre: string
  @ApiProperty({ example: 'De Olim' })
  primerApellido: string
  @ApiProperty({ example: 'Gerente' })
  cargo: string
}
