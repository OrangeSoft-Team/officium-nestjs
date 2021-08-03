import { ApiProperty } from '@nestjs/swagger'

export class HabilidadDetalleEmpleadoApiDTO {
  @ApiProperty({ example: 'a476b8ed-0a85-4bc1-9972-e8c9d0b05cfe' })
  uuid: string
  @ApiProperty({ example: 'Reposteria' })
  nombre: string
  @ApiProperty({ example: 'Cocina' })
  categoria: string
}

export class ExperienciaDetalleEmpleadoApiDTO {
  @ApiProperty({ example: '66870626-a975-4767-86d6-e041543baba2' })
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

export class DetalleEmpleadoApiDTO {
  @ApiProperty({ example: '9d0a7dd2-3022-45b6-bb5d-cacd1a32ac05' })
  uuid: string
  @ApiProperty({ example: 'José' })
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
  @ApiProperty({ example: '16/09/1999' })
  fechaNacimiento: string
  @ApiProperty({ example: 'Av. Francisco de Miranda' })
  calleUno: string
  @ApiProperty({ example: 'Res. Francia', required: false, nullable: true })
  calleDos?: string
  @ApiProperty({ example: '1070' })
  codigoPostal: string
  @ApiProperty({ example: 'Venezuela' })
  nombrePais: string
  @ApiProperty({ example: 'Distrito Capital' })
  nombreEstado: string
  @ApiProperty({ example: 'Caracas' })
  nombreCiudad: string
  @ApiProperty({
    isArray: true,
    example: [
      {
        uuid: 'f9309033-7c68-43b8-86ba-af9e9e717189',
        nombre: 'Reposteria',
        categoria: 'Cocina',
      },
    ],
  })
  habilidades: HabilidadDetalleEmpleadoApiDTO[]
  @ApiProperty({
    isArray: true,
    example: [
      {
        uuid: '80406ccc-6df0-4ed8-8e19-f513a1361efa',
        cargo: 'Gerente',
        nombreEmpresa: 'OrangeSoft',
        fechaInicio: '16/06/2020',
        fechaFin: '16/06/2021',
      },
    ],
  })
  experienciasLaborales: ExperienciaDetalleEmpleadoApiDTO[]
}
