import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EmpleadoORM } from './Empleado.orm'
import { HabilidadORM } from './Habilidad.orm'

@Entity('habilidades_empleados')
export class HabilidadEmpleadoORM {
  @ManyToOne(() => EmpleadoORM, (empleado) => empleado.habilidades_empleados, {
    primary: true,
  })
  @JoinColumn({ name: 'uuid_empleado' })
  empleado: EmpleadoORM

  @ManyToOne(
    () => HabilidadORM,
    (habilidad) => habilidad.habilidades_empleados,
    { primary: true },
  )
  @JoinColumn({ name: 'uuid_habilidad' })
  habilidad: HabilidadORM
}
