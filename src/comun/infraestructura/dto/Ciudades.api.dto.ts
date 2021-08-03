import { ApiProperty } from '@nestjs/swagger'

export class CiudadesApiDTO {
  @ApiProperty({ example: 'ea59c7f6-54d3-4d50-9321-06f6d3ced0a0' })
  uuidPais: string
  @ApiProperty({ example: 'fc7608d6-8738-4039-a2b6-d73c847f1f14' })
  uuidEstado: string
  @ApiProperty({ example: '4d65038d-313e-41ec-b6c2-daf7a946a06b' })
  uuidCiudad: string
  @ApiProperty({ example: 'Caracas' })
  nombreCiudad: string
}
