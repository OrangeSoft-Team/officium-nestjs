import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { EstadoORM } from './Estado.orm'

@Entity('ciudades')
export class CiudadORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => EstadoORM, (estado) => estado.ciudades)
  estado: EstadoORM

  @OneToMany(() => DireccionORM, (direccion) => direccion.uuid)
  direcciones: DireccionORM[]
}
