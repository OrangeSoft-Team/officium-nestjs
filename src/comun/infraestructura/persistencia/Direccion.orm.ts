import { Empresa } from 'src/empleado/dominio/Empresa'
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { EmpresaORM } from './Empresa.orm'

@Entity()
export class DireccionORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  calle: string

  @Column()
  codigoPostal: string

  @ManyToOne(() => CiudadORM, (ciudad) => ciudad.direcciones)
  Ciudad: CiudadORM

  @OneToMany(() => EmpresaORM, (empresa) => empresa.uuid)
  empresas: EmpresaORM[]

}