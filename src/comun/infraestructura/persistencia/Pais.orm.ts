import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('paises')
export class PaisORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string
}
