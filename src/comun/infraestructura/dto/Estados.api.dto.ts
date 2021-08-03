import { ApiProperty } from '@nestjs/swagger'

export class EstadosApiDTO {
  @ApiProperty({ example: 'c4ececa2-d6a7-4031-9d35-8bbd2592a3f6' })
  uuidPais: string
  @ApiProperty({ example: '978f1aaf-06d3-421b-af7c-108349626b58' })
  uuidEstado: string
  @ApiProperty({ example: 'Distrito Capital' })
  nombreEstado: string
}
