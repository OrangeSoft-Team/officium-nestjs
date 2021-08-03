import { ApiProperty } from '@nestjs/swagger'

export class ActualizarExperienciaLaboralEmpleadoApiDTO {
  @ApiProperty({ example: 'Gerente' })
  cargo: string
  @ApiProperty({ example: 'OrangeSoft' })
  nombreEmpresa: string
  @ApiProperty({ example: '16/06/2020' })
  fechaInicio: string
  @ApiProperty({ example: '16/06/2021' })
  fechaFin: string
}
