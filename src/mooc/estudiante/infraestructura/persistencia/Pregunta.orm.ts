import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { CuestionarioORM } from './Cuestionario.orm'
import { OpcionORM } from './Opcion.orm'

@Entity('preguntas')
export class PreguntaORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  enunciado: string

  @Column()
  tipo: string

  @Column()
  ponderacion: number

  @OneToMany(
    () => OpcionORM,
    (opcion) => opcion.pregunta,
   )
   opciones: OpcionORM[]  

  @ManyToOne(
    () => CuestionarioORM,
    (cuestionario) => cuestionario.preguntas,
  ) 
  @JoinColumn({ name: 'uuid_cuestionario' })
  cuestionario: CuestionarioORM
}