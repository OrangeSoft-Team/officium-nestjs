import { ApiProperty } from '@nestjs/swagger'

export class HabilidadesEmpleadoApiDTO {
  @ApiProperty({
    example: [
      '5d18c0b6-7c3e-445f-b468-18fa1910e252',
      'c33c3809-cbf3-4165-bb94-197982da2679',
    ],
  })
  uuid: string[]
}
