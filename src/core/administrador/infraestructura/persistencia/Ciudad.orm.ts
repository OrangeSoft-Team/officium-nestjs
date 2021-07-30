import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { EstadoORM } from './Estado.orm'

@Entity('ciudades')
export class CiudadORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @ManyToOne(() => EstadoORM, (estado) => estado.ciudades)
  @JoinColumn({
    name: 'uuid_estado',
  })
  estado: EstadoORM

  @OneToMany(() => DireccionORM, (direccion) => direccion.uuid)
  direcciones: DireccionORM[]
}
