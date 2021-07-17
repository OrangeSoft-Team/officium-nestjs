import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { PaisORM } from './Pais.orm'

@Entity('estados')
export class EstadoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => PaisORM, (pais) => pais.estados)
  pais: PaisORM

  @OneToMany(() => CiudadORM, (ciudad) => ciudad.uuid)
  ciudades: CiudadORM[]
}
