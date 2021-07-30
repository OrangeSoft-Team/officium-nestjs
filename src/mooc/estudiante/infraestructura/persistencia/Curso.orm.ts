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

@Entity('cuestionarios')
export class CursoORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  titulo: string

  @Column()
  estatus: string

  @Column()
  duracionEstimadaEscala: string

  @Column()
  duracionEstimadaValor: number

  @Column()
  fechaCreacion: Date

  @OneToMany(() => HabilidadORM, (habilidad) => habilidad.curso)
  habilidades: HabilidadORM[]

  @OneToOne(() => CuestionarioORM, (cuestionario) => cuestionario.curso)
  @JoinColumn({
    name: 'uuid_cuestionario',
  })
  cuestionario: CuestionarioORM

  @OneToMany(() => LeccionORM, (leccion) => leccion.curso)
  lecciones: LeccionORM[]

  @Column()
  fechaModificacion: Date
}
