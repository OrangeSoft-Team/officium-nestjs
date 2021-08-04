import { ApiProperty } from '@nestjs/swagger'

interface HabilidadesDetalleCursoApiDTO {
  uuid: string
  nombre: string
  categoria: string
}

interface LeccionesDetalleCursoApiDTO {
  uuid: string
  titulo: string
}

export class DetalleCursoApiDTO {
  @ApiProperty({ example: 'a2cda2c4-7f8d-4547-a67a-06147d8e29cf' })
  uuid: string
  @ApiProperty({ example: 'Titulo del curso' })
  titulo: string
  @ApiProperty({ example: 'ACTIVO' })
  estatus: string
  @ApiProperty({ example: 1 })
  valorDuracion: number
  @ApiProperty({ example: 'SEMANA' })
  escalaDuracion: string
  @ApiProperty({ example: '04/08/2021' })
  fechaCreacion: string
  @ApiProperty({ example: '04/08/2021' })
  fechaUltimaModificacion?: string
  @ApiProperty({
    example: [
      {
        uuid: 'e244757d-bbe1-4caa-ad48-290cca6bbf33',
        titulo: 'Titulo de la leccion del curso',
      },
    ],
  })
  lecciones: LeccionesDetalleCursoApiDTO[]
  @ApiProperty({
    example: [
      {
        uuid: 'f7f6929d-527a-4961-b37d-9fdefbfec7d0',
        nombre: 'Reposteria',
        categoria: 'Cocina',
      },
    ],
  })
  habilidades: HabilidadesDetalleCursoApiDTO[]
}
