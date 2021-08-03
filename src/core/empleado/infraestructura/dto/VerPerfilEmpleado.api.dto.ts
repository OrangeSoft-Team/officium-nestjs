import { ApiProperty } from '@nestjs/swagger'

export class VerPerfilEmpleadoApiDTO {
  @ApiProperty({ example: 'jose@gmail.com' })
  correoElectronico: string
  @ApiProperty({ example: 'Jose' })
  primerNombre: string
  @ApiProperty({ example: 'Perez' })
  primerApellido: string
  @ApiProperty({ example: 'Andrés', required: false, nullable: true })
  segundoNombre?: string
  @ApiProperty({ example: 'Quintana', required: false, nullable: true })
  segundoApellido?: string
  @ApiProperty({ example: 'MASCULINO' })
  genero: string
  @ApiProperty({ example: 'PREGRADO' })
  nivelEducativo: string
  @ApiProperty({ example: '+584248596574' })
  numeroTelefonico: string
  @ApiProperty({ example: '16/06/1999' })
  fechaNacimiento: string
  @ApiProperty({ example: '123456' })
  codigoPostal: string
  @ApiProperty({ example: 'Av. José Antonio Paez' })
  calleUno: string
  @ApiProperty({ example: 'Res. Quintero', required: false, nullable: true })
  calleDos?: string
  @ApiProperty({ example: 'c4c36bb5-5c24-4034-8caf-d265a18941de' })
  uuidPais: string
  @ApiProperty({ example: '9e86b8cd-4772-4038-a1c3-1ead4c0ebb6b' })
  uuidEstado: string
  @ApiProperty({ example: '4133e93c-496d-4b12-b4dc-514ff6070fa7' })
  uuidCiudad: string
}
