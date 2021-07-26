import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EmpresaORM } from './Empresa.orm'
import { HabilidadORM } from './Habilidad.orm'

@Entity('habilidades_empresas')
export class HabilidadEmpresaORM {
  @ManyToOne(() => EmpresaORM, (empresa) => empresa.habilidades_empresas, {
    primary: true,
  })
  @JoinColumn({ name: 'uuid_empresa' })
  empresa: EmpresaORM

  @ManyToOne(
    () => HabilidadORM,
    (habilidad) => habilidad.habilidades_empresas,
    { primary: true },
  )
  @JoinColumn({ name: 'uuid_habilidad' })
  habilidad: HabilidadORM
}
