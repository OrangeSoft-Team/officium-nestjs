import { ApiProperty } from '@nestjs/swagger'

export class EditarEmpresaApiDTO {
  @ApiProperty({ example: 'OrangeSoft' })
  nombre: string
  @ApiProperty({ example: 'ACTIVO' })
  estatus: string
  @ApiProperty({
    example: 'Debe saber exprimir naranjas.',
    nullable: true,
    required: false,
  })
  requisitosEspeciales?: string
}
