import { ApiProperty } from '@nestjs/swagger'

export class DatosRegistroEmpleadoApiDTO {
  @ApiProperty({ example: 'test@officium.com' })
  correoElectronico: string
  @ApiProperty({ example: '89u598rfjj4j3985jGFJ5489' })
  token: string
  @ApiProperty({ example: 'Andres' })
  primerNombre: string
  @ApiProperty({ nullable: true, required: false, example: 'Ruiz' })
  segundoNombre?: string
  @ApiProperty({ example: 'Jose' })
  primerApellido: string
  @ApiProperty({ nullable: true, required: false, example: 'De Olim' })
  segundoApellido?: string
  @ApiProperty({ example: 'MASCULINO' })
  genero: string
  @ApiProperty({ example: 'POSTGRADO' })
  nivelEducativo: string
  @ApiProperty({ example: '+584144589565' })
  numeroTelefonico: string
  @ApiProperty({ example: '16/05/1997' })
  fechaNacimiento: string
  @ApiProperty({ example: '1010' })
  codigoPostal: string
  @ApiProperty({ example: 'Av. Francisco De Miranda' })
  calleUno: string
  @ApiProperty({ nullable: true, required: false, example: 'Edificio Francia' })
  calleDos?: string
  @ApiProperty({ example: '59a11c88-d6fe-417f-8dbf-e96eeb979409' })
  uuidPais: string
  @ApiProperty({ example: '1edea637-aee9-4ccc-ad1e-ea793126d7e4' })
  uuidEstado: string
  @ApiProperty({ example: '1668019e-68ca-46c0-8d06-36b8cb185286' })
  uuidCiudad: string
}
