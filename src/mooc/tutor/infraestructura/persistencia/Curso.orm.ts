import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm'
import { HabilidadORM } from './Habilidad.orm'


@Entity('cursos')
export class CursoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  titulo: string

  @Column()
  estatus: string

  @Column()
  valor_duracion: number

  @Column()
  escala_duracion: string
/* 
  @Column()
  fecha_creacion: Date

  @Column()
  fecha_ultima_modificacion: Date
 */
  @OneToMany(() => HabilidadORM, (habilidad) => habilidad.curso)
  habilidades: HabilidadORM[]
/* 
  @OneToOne(() => CuestionarioORM)
  cuestionario: CuestionarioORM

  @OneToMany(() => LeccionORM, (leccion) => leccion.curso)
  lecciones: LeccionORM[]
 */

}
