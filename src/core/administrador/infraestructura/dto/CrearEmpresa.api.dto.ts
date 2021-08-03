import { ApiProperty } from '@nestjs/swagger'

export class CrearEmpresaApiDTO {
  @ApiProperty({ example: 'OrangeSoft' })
  nombre: string
  @ApiProperty({ example: 'orangesoft@gmail.com' })
  correo: string
  @ApiProperty({ example: 'Debe saber exprimir naranjas.' })
  requisitosEspeciales?: string
  @ApiProperty({ example: '44rfh4H4987HFh94h7892' })
  token: string
}
