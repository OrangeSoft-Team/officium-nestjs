import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { CiudadORM } from './Ciudad.orm'
import { EmpleadoORM } from './Empleado.orm'
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
  ciudad: CiudadORM

  @OneToMany(() => EmpresaORM, (empresa) => empresa.uuid)
  empresas: EmpresaORM[]

  @OneToMany(() => EmpleadoORM, (empleado) => empleado.uuid)
  empleados: EmpleadoORM[]
}
