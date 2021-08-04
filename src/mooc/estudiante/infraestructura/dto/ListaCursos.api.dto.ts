import { ApiProperty } from '@nestjs/swagger'

export class ListaCursosApiDTO {
  @ApiProperty({ example: 'ebd44abc-3fc4-4815-b891-ea3376c1b1e9' })
  uuid: string
  @ApiProperty({ example: 'Titulo del curso' })
  titulo: string
  @ApiProperty({ example: 'ACTIVO' })
  estatus: string
  @ApiProperty({ example: '04/08/2021' })
  fechaCreacion: string
}
