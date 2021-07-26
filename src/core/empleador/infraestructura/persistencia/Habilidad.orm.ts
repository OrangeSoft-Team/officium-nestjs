import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm'
import { HabilidadEmpresaORM } from './HabilidadEmpresa.orm'

@Entity('habilidades')
export class HabilidadORM {
  @PrimaryColumn('uuid')
  uuid: string

  @Column()
  nombre: string

  @Column()
  categoria: string

  @OneToMany(
    () => HabilidadEmpresaORM,
    (habilidadEmpresa) => habilidadEmpresa.habilidad,
  )
  habilidades_empresas: HabilidadEmpresaORM[]
}
