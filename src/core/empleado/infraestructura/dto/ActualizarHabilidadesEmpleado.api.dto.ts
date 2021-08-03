import { ApiProperty } from '@nestjs/swagger'

export class ActualizarHabilidadesEmpleadoApiDTO {
  @ApiProperty({
    example: [
      'e541bcca-94d6-44ce-b310-64ba21acf82c',
      '23cd0b47-e1fb-4aad-953e-0b0d32f8eb3a',
    ],
  })
  uuid: string[]
}
