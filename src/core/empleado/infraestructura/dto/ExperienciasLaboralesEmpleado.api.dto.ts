import { ApiProperty } from '@nestjs/swagger'

export class ExperienciasLaboralesEmpleadoApiDTO {
  @ApiProperty({ example: '414e9e61-83fe-41c1-b2ef-16e1270bb7ba' })
  uuid: string
  @ApiProperty({ example: 'Gerente' })
  cargo: string
  @ApiProperty({ example: 'OrangeSoft' })
  nombreEmpresa: string
  @ApiProperty({ example: '16/06/2020' })
  fechaInicio: string
  @ApiProperty({ example: '16/06/2021' })
  fechaFin: string
}
