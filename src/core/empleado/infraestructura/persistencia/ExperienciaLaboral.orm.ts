import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { EmpleadoORM } from './Empleado.orm'

@Entity('experiencias_laborales')
export class ExperienciaLaboralORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  cargo: string

  @Column()
  nombre_empresa: string

  @Column()
  fecha_inicio: Date

  @Column()
  fecha_fin: Date

  @ManyToOne(() => EmpleadoORM, (empleado) => empleado.experiencias_laborales)
  @JoinColumn({ name: 'uuid_empleado' })
  empleado: EmpleadoORM
}
