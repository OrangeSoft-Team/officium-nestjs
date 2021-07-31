import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EstadoORM } from './Estado.orm'

@Entity('ciudades')
export class CiudadORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => EstadoORM, (estado) => estado.ciudades)
  @JoinColumn({
    name: 'uuid_estado',
  })
  estado: EstadoORM
}
