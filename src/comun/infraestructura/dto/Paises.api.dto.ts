import { ApiProperty } from '@nestjs/swagger'

export class PaisesApiDTO {
  @ApiProperty({ example: '1ceca5ce-60e6-47f9-9722-62c3d621237c' })
  uuidPais: string
  @ApiProperty({ example: 'Venezuela' })
  nombrePais: string
}
