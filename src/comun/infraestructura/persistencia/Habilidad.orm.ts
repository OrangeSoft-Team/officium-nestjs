import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('habilidades')
export class HabilidadORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @Column()
  categoria: string
}
