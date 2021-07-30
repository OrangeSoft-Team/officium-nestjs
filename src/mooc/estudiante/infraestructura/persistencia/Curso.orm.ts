import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { CuestionarioORM } from './Cuestionario.orm'
import { HabilidadORM } from './Habilidad.orm'
import { LeccionORM } from './Leccion.orm'

@Entity('cursos')
export class CursoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  titulo: string

  @Column()
  estatus: string

  @Column()
  escala_duracion: string

  @Column()
  valor_duracion: number

  @Column()
  fecha_creacion: Date

  @OneToMany(() => HabilidadORM, (habilidad) => habilidad.curso)
  habilidades: HabilidadORM[]

 @OneToOne(() => CuestionarioORM)
  @JoinColumn({
   name: 'uuid_cuestionario',
  })
  cuestionario: CuestionarioORM

  @OneToMany(() => LeccionORM, (leccion) => leccion.curso)
  lecciones: LeccionORM[]

  @Column()
  fecha_modificacion: Date
}
