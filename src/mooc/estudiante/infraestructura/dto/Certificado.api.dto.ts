import { ApiProperty } from '@nestjs/swagger'

export class ListaCertificadosApiDTO {
  @ApiProperty({ example: '77d00e4c-15aa-45d2-94ff-8efae74a1853' })
  uuid: string
  @ApiProperty({ example: 'Titulo del certificado' })
  titulo: string
  @ApiProperty({ example: '04/08/2021' })
  fechaExpedicion: string
}

export class DetalleCertificadoApiDTO {
  @ApiProperty({ example: '2e771e7d-9774-4b9e-acf8-f87651efea6e' })
  uuid: string
  @ApiProperty({ example: 'Titulo del certificado' })
  titulo: string
  @ApiProperty({ example: '04/08/2021' })
  fechaExpedicion: string
  @ApiProperty({ example: 'Descripción del certificado' })
  descripcion: string
}
