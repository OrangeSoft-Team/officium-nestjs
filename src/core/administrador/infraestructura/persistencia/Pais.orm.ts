import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { EstadoORM } from './Estado.orm'

@Entity('paises')
export class PaisORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @OneToMany(() => EstadoORM, (estado) => estado.uuid)
  estados: EstadoORM[]
}
