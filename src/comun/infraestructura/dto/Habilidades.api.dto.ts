import { ApiProperty } from '@nestjs/swagger'

export class HabilidadesApiDTO {
  @ApiProperty({ example: '490a2f36-638e-4cbc-bd62-b82c02a7e6d7' })
  uuid: string
  @ApiProperty({ example: 'Reposteria' })
  nombre: string
  @ApiProperty({ example: 'Cocina' })
  categoria: string
}
