import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { EmpleadoORM } from './Empleado.orm'

@Entity()
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
  ciudad: CiudadORM

  @OneToOne(() => EmpleadoORM)
  empleado: EmpleadoORM
}
