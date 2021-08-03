import { ApiProperty } from '@nestjs/swagger'

export class DetalleEmpresaApiDTO {
  @ApiProperty({ example: 'e16e13a0-79c1-4dc3-a4d2-c01f40c60baf' })
  uuid: string
  @ApiProperty({ example: 'OrangeSoft' })
  nombre: string
  @ApiProperty({ example: 'orangesoft@gmail.com' })
  correo: string
  @ApiProperty({ example: 'ACTIVO' })
  estatus: string
  @ApiProperty({
    example: 'Debe saber exprimir naranjas.',
    nullable: true,
    required: false,
  })
  requisitosEspeciales?: string
}
