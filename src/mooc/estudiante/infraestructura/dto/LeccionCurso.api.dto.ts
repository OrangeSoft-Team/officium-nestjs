import { ApiProperty } from '@nestjs/swagger'

export class LeccionCursoApiDTO {
  @ApiProperty({ example: '4e414199-6801-4290-8039-5edca7c427fd' })
  uuid: string
  @ApiProperty({ example: 'Titulo de la lección' })
  titulo: string
  @ApiProperty({ example: 'Descripción de la lección' })
  descripcion: string
  @ApiProperty({ example: 'Contenido de la lección' })
  contenido: string
}
