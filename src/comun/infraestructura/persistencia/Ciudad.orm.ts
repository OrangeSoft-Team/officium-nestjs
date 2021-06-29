import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { EstadoORM } from './Estado.orm'

@Entity()
export class CiudadORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => EstadoORM, (estado) => estado.ciudades)
  estado: EstadoORM
}
