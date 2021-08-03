import { ApiProperty } from '@nestjs/swagger'

export class ActualizarDatosBasicosAdministradorApiDTO {
  @ApiProperty({ example: 'Miguel' })
  primerNombre: string
  @ApiProperty({ example: 'De Olim' })
  primerApellido: string
  @ApiProperty({ example: 'Gerente' })
  cargo: string
}
