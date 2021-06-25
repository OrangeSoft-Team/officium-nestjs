import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { OfertaLaboralORM } from './OfertaLaboral.orm'

@Entity()
export class EmpleadorORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  nombre: string

  @Column()
  correoElectronico: string

  @Column()
  direccionCalle: string

  @Column()
  codigoPostal: string

  @OneToMany(() => OfertaLaboralORM, (oferta) => oferta.uuid)
  ofertasLaborales: OfertaLaboralORM[]
}
