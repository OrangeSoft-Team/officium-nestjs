import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { EmpleadoORM } from './Empleado.orm'

@Entity('direcciones')
export class DireccionORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  calle_uno: string

  @Column()
  codigo_postal: string

  @Column({ nullable: true })
  calle_dos: string

  @ManyToOne(() => CiudadORM, (ciudad) => ciudad.direcciones)
  @JoinColumn({
    name: 'uuid_ciudad',
  })
  ciudad: CiudadORM

  @OneToOne(() => EmpleadoORM)
  empleado: EmpleadoORM
}
