import { ApiProperty } from '@nestjs/swagger'

export class ListaEmpresasApiDTO {
  @ApiProperty({ example: '6dddbd3a-a9cd-4815-b3fc-433acfb1c605' })
  uuid: string
  @ApiProperty({ example: 'OrangeSoft' })
  nombre: string
  @ApiProperty({ example: 'orangesoft@gmail.com' })
  correo: string
  @ApiProperty({ example: 'ACTIVO' })
  estatus: string
}
