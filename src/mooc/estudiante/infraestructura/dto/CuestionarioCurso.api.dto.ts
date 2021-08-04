import { ApiProperty } from '@nestjs/swagger'

interface OpcionesPreguntaApiDTO {
  uuid: string
  valor: string
}

interface PreguntasCuestionarioApiDTO {
  uuid: string
  enunciado: string
  tipo: string
  ponderacion: number
  opciones: OpcionesPreguntaApiDTO[]
}

export interface RespuestasOpcionesApiDTO {
  uuidPregunta: string
  uuidOpcion: string
}

export class CuestionarioCursoApiDTO {
  @ApiProperty({ example: '86b60df7-1fb0-4d65-af6c-993c57b29e5d' })
  uuid: string
  @ApiProperty({ example: 1 })
  valorDuracion: number
  @ApiProperty({ example: 'HORA' })
  escalaDuracion: string
  @ApiProperty({ example: 1 })
  intentosPermitidos: number
  @ApiProperty({
    example: [
      {
        uuid: '6bfd8008-5f92-4402-8daf-d19b8fb732cc',
        enunciado: 'Enunciado de la pregunta',
        tipo: 'SIMPLE',
        ponderacion: 100,
        opciones: [
          {
            uuid: '724fecf1-ad5f-45d4-9613-d32eebefd9f3',
            valor: 'Opción #1',
          },
          {
            uuid: '7d63ed11-1756-469a-80a7-a600b9e9fce6',
            valor: 'Opción #2',
          },
        ],
      },
    ],
  })
  preguntasCuestionario: PreguntasCuestionarioApiDTO[]
}
