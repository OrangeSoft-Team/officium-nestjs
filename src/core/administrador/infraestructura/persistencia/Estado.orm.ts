import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { PaisORM } from './Pais.orm'

@Entity('estados')
export class EstadoORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => PaisORM, (pais) => pais.estados)
  @JoinColumn({
    name: 'uuid_pais',
  })
  pais: PaisORM

  @OneToMany(() => CiudadORM, (ciudad) => ciudad.uuid)
  ciudades: CiudadORM[]
}
