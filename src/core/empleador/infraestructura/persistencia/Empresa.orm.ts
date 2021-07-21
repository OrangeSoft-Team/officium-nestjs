import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { DireccionORM } from './Direccion.orm'

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

  @OneToOne(() => DireccionORM)
  @JoinColumn({
    name: 'uuid_direccion',
  })
  direccion: DireccionORM
}
