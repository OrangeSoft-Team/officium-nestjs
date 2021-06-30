import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { EstadoORM } from './Estado.orm'

@Entity()
export class CiudadORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => EstadoORM, (estado) => estado.ciudades)
  estado: EstadoORM

  @OneToMany(() => DireccionORM, (direccion) => direccion.uuid)
  direcciones: DireccionORM[]
}

