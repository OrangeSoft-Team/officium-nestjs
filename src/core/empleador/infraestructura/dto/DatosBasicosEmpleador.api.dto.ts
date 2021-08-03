import { ApiProperty } from '@nestjs/swagger'

export class HabilidadesDatosBasicosEmpleadorApiDTO {
  @ApiProperty({ example: '98b20a7d-6e36-486e-83ba-55c1926012b9' })
  uuid: string
  @ApiProperty({ example: 'Reposteria' })
  nombre: string
  @ApiProperty({ example: 'Cocina' })
  categoria: string
}

export class DatosBasicosEmpleadorApiDTO {
  @ApiProperty({ example: 'OrangeSoft' })
  nombreEmpresa: string
  @ApiProperty({ example: 'orangesoft@gmail.com' })
  correoElectronico: string
  @ApiProperty({
    example: 'Debe saber exprimir naranjas.',
    required: false,
    nullable: true,
  })
  requisitosEspeciales?: string
  @ApiProperty({ example: '1070', required: false, nullable: true })
  codigoPostal?: string
  @ApiProperty({
    example: 'Av. Francisco de Miranda',
    required: false,
    nullable: true,
  })
  calleUno?: string
  @ApiProperty({
    example: 'Multicentro Empresarial del Este',
    required: false,
    nullable: true,
  })
  calleDos?: string
  @ApiProperty({
    example: 'c6b9e08e-f84a-4cf3-af2e-bfcc18be5d57',
    required: false,
    nullable: true,
  })
  uuidPais?: string
  @ApiProperty({
    example: 'c0b031d6-1d04-41ec-a0e2-634c4771bef6',
    required: false,
    nullable: true,
  })
  uuidEstado?: string
  @ApiProperty({
    example: 'abf2fb4f-73a1-4879-baf2-a46488135ef9',
    required: false,
    nullable: true,
  })
  uuidCiudad?: string
  @ApiProperty({
    example: [
      {
        uuid: '0ec910f3-d066-4956-b219-dab46316b1a1',
        nombre: 'Reposteria',
        categoria: 'Cocina',
      },
    ],
    required: false,
    nullable: true,
  })
  habilidades: HabilidadesDatosBasicosEmpleadorApiDTO[]
}
