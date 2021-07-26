import { getRepository } from 'typeorm'
import {
  HabilidadPersistenciaDTO,
  IRepositorioHabilidades,
} from '../../aplicacion/puertos/IRepositorioHabilidades'
import { EmpresaORM } from '../persistencia/Empresa.orm'
import { HabilidadORM } from '../persistencia/Habilidad.orm'
import { HabilidadEmpresaORM } from '../persistencia/HabilidadEmpresa.orm'

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdentificadores(
    identificadores: string[],
  ): Promise<HabilidadPersistenciaDTO[]> {
    try {
      const habilidadORM = getRepository(HabilidadORM)
      const habilidades = []

      for (const uuid of identificadores) {
        const habilidad = await habilidadORM.findOne({ where: { uuid } })
        habilidades.push({
          id: habilidad.uuid,
          nombre: habilidad.nombre,
          categoria: habilidad.categoria,
        })
      }

      return habilidades
    } catch {}
  }

  public async guardarParaEmpresa(
    habilidades: HabilidadPersistenciaDTO[],
    idEmpresa: string,
  ): Promise<void> {
    try {
      const habilidadORM = getRepository(HabilidadORM)
      const empresaORM = getRepository(EmpresaORM)
      const habilidadEmpresaORM = getRepository(HabilidadEmpresaORM)

      const empresa = await empresaORM.findOneOrFail({
        where: { uuid: idEmpresa },
      })

      const habilidadesEmpresa = await habilidadEmpresaORM
        .createQueryBuilder('habilidades_empresas')
        .where('habilidades_empresas.uuid_empresa = :idEmpresa', { idEmpresa })
        .getMany()
      await habilidadEmpresaORM.remove(habilidadesEmpresa)

      for (const datosHab of habilidades) {
        const habilidad = await habilidadORM.findOne({
          where: { uuid: datosHab.id },
        })

        const habEmpresa = habilidadEmpresaORM.create({
          empresa,
          habilidad,
        })

        await habilidadEmpresaORM.save(habEmpresa)
      }
    } catch {}
  }

  public async obtenerPorIdEmpresa(
    id: string,
  ): Promise<HabilidadPersistenciaDTO[]> {
    try {
      const habilidadEmpresaORM = getRepository(HabilidadEmpresaORM)

      const habilidadesEmpresa = await habilidadEmpresaORM
        .createQueryBuilder('habilidades_empresas')
        .innerJoinAndSelect('habilidades_empresas.habilidad', 'habilidad')
        .where('habilidades_empresas.uuid_empresa = :id', { id })
        .getMany()

      const datos = habilidadesEmpresa.map((habEmp) => {
        const habilidad = habEmp.habilidad

        return {
          id: habilidad.uuid,
          nombre: habilidad.nombre,
          categoria: habilidad.categoria,
        }
      })

      return datos
    } catch {}
  }
}
