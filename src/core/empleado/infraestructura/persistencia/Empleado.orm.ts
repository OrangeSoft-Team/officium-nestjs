import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { ExperienciaLaboralORM } from './ExperienciaLaboral.orm'
import { HabilidadEmpleadoORM } from './HabilidadEmpleado.orm'

@Entity('empleados')
export class EmpleadoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  primer_nombre: string

  @Column()
  primer_apellido: string

  @Column()
  correo_electronico: string

  @Column()
  telefono: string

  @Column()
  nivel_educativo: string

  @Column()
  estatus: string

  @Column()
  genero: string

  @Column()
  fecha_nacimiento: Date

  @Column()
  token: string

  @Column({ nullable: true })
  segundo_nombre: string

  @Column({ nullable: true })
  segundo_apellido: string

  @OneToOne(() => DireccionORM)
  @JoinColumn({
    name: 'uuid_direccion',
  })
  direccion: DireccionORM

  @OneToMany(() => ExperienciaLaboralORM, (experiencia) => experiencia.empleado)
  experiencias_laborales: ExperienciaLaboralORM[]

  @OneToMany(
    () => HabilidadEmpleadoORM,
    (habilidadEmpleado) => habilidadEmpleado.empleado,
  )
  habilidades_empleados: HabilidadEmpleadoORM[]
}
