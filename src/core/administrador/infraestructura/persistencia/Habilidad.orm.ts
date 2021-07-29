import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { HabilidadEmpleadoORM } from './HabilidadEmpleado.orm'

@Entity('habilidades')
export class HabilidadORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @Column()
  categoria: string

  @OneToMany(
    () => HabilidadEmpleadoORM,
    (habilidadEmpleado) => habilidadEmpleado.habilidad,
  )
  habilidades_empleados: HabilidadEmpleadoORM[]
}
