import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { HabilidadEmpresaORM } from './HabilidadEmpresa.orm'

@Entity('empresas')
export class EmpresaORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  nombre: string

  @Column({ nullable: true })
  requisitos_especiales: string

  @Column()
  estatus: string

  @Column()
  correo_electronico: string

  @Column()
  token: string

  @OneToOne(() => DireccionORM, { nullable: true })
  @JoinColumn({
    name: 'uuid_direccion',
  })
  direccion: DireccionORM

  @OneToMany(
    () => HabilidadEmpresaORM,
    (habilidadEmpresa) => habilidadEmpresa.empresa,
  )
  habilidades_empresas: HabilidadEmpresaORM[]
}
