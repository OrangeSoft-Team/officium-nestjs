import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('personales_administrativos')
export class AdministradorORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  correo_electronico: string

  @Column()
  primer_nombre: string

  @Column()
  primer_apellido: string

  @Column()
  cargo: string

  @Column()
  token: string
}
