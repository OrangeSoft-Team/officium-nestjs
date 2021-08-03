import { ApiProperty } from '@nestjs/swagger'

export class ListaEmpleadosApiDTO {
  @ApiProperty({ example: '2f204fef-556c-4151-8120-8e5dda808c17' })
  uuid: string
  @ApiProperty({ example: 'Jose' })
  primerNombre: string
  @ApiProperty({ example: 'Perez' })
  primerApellido: string
  @ApiProperty({ example: 'Andres', nullable: true, required: false })
  segundoNombre?: string
  @ApiProperty({ example: 'Quintero', nullable: true, required: false })
  segundoApellido?: string
  @ApiProperty({ example: 'jose@gmail.com' })
  correo: string
  @ApiProperty({ example: 'DISPONIBLE' })
  estatus: string
  @ApiProperty({ example: 'MASCULINO' })
  genero: string
}
