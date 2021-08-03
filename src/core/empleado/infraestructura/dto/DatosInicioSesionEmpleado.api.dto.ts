// USM 4.1

import { ApiProperty } from '@nestjs/swagger'

// USM 4.3
export class DatosInicioSesionEmpleadoApiDTO {
  @ApiProperty({ example: 'jose@gmail.com' })
  correoElectronico: string
  @ApiProperty({ example: '4398r342q98fy43189r' })
  token: string
}

export class DatosSesionAutenticadaEmpleadoApiDTO {
  @ApiProperty({ example: 'Jose' })
  primerNombre: string
  @ApiProperty({ example: 'Perez' })
  primerApellido: string
}
