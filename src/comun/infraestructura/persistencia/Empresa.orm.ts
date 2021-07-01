import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { OfertaLaboralORM } from './OfertaLaboral.orm'

@Entity()
export class EmpresaORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  nombre: string

  @Column()
  correoElectronico: string

  @ManyToOne(() => DireccionORM, (direccion) => direccion.empresas)
  direccion: DireccionORM

  @OneToMany(() => OfertaLaboralORM, (oferta) => oferta.uuid)
  ofertasLaborales: OfertaLaboralORM[]
}
