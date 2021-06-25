import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { EmpresaORM } from './Empresa.orm'

@Entity()
export class OfertaLaboralORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  titulo: string

  @Column()
  fechaPublicacion: Date

  @Column({ nullable: true })
  fechaModificacion: Date

  @Column()
  cargo: string

  @Column()
  sueldo: number

  @Column()
  descripcion: string

  @Column()
  duracionEstimaada: number

  @Column()
  escalaDuracion: string

  @Column()
  turno: string

  @Column()
  numeroVacantes: number

  @Column()
  estado: string

  @ManyToOne(() => EmpresaORM, (empresa) => empresa.ofertasLaborales)
  empresa: EmpresaORM
}
