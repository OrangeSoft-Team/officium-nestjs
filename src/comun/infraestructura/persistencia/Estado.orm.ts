import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { PaisORM } from './Pais.orm'

@Entity('estados')
export class EstadoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => PaisORM, (pais) => pais.estados)
  @JoinColumn({
    name: 'uuid_pais',
  })
  pais: PaisORM
}
