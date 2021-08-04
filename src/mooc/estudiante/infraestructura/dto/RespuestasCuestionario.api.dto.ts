import { ApiProperty } from '@nestjs/swagger'

export class RespuestasCuestionarioApiDTO {
  @ApiProperty({ example: 'a95125f1-680a-4707-9387-c3d90e5a0c8b' })
  uuidPregunta: string
  @ApiProperty({ example: 'dc1c3764-fd40-4ffa-81b2-6ddafea2560e' })
  uuidOpcion: string
}
