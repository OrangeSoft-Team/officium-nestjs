import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { EmpleadoORM } from './Empleado.orm'
import { OfertaLaboralORM } from './OfertaLaboral.orm'

@Entity()
export class PostulacionOfertaORM {
  @PrimaryColumn()
  uuid: string

  @ManyToOne(() => OfertaLaboralORM, (oferta) => oferta.postulaciones)
  oferta: OfertaLaboralORM

  @ManyToOne(() => EmpleadoORM, (empleado) => empleado.postulaciones)
  empleado: EmpleadoORM

  @Column()
  estado: string

  @Column()
  fecha: Date

  @Column({ nullable: true })
  comentario: string
}
