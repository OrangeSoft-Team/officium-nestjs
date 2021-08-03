import { ApiProperty } from '@nestjs/swagger'

export class ActualizarDatosBasicosEmpleadorApiDTO {
  @ApiProperty({ example: 'OrangeSoft' })
  nombreEmpresa: string
  @ApiProperty({
    example: 'Debe saber exprimir naranjas',
    nullable: true,
    required: false,
  })
  requisitosEspeciales?: string
  @ApiProperty({ example: '1070' })
  codigoPostal: string
  @ApiProperty({ example: 'Av. Francisco de Miranda' })
  calleUno: string
  @ApiProperty({
    example: 'Multicentro Empresarial del Este',
    nullable: true,
    required: false,
  })
  calleDos?: string
  @ApiProperty({ example: 'ddc7e3a2-ce29-43e0-9942-ceab5fdbf8f4' })
  uuidPais: string
  @ApiProperty({ example: 'ed560cce-4c34-41ec-89d4-5b0e21e1bf53' })
  uuidEstado: string
  @ApiProperty({ example: '1dec4f53-c729-4384-a797-614902ca42d9' })
  uuidCiudad: string
  @ApiProperty({
    example: [
      'bbb47b60-ced4-46c4-9085-cbeb41ba640f',
      'a51cd05b-7b21-476f-94ab-9e19d2188bc8',
    ],
  })
  uuidHabilidades: string[]
}
