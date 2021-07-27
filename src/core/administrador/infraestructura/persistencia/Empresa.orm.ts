import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('empresas')
export class EmpresaORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @Column()
  estatus: string

  @Column()
  correo_electronico: string

  @Column()
  requisitos_especiales: string

  @Column()
  token: string
}
