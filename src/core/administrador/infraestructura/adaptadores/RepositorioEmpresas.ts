import { getRepository } from 'typeorm'
import {
  EmpresaPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../aplicacion/puertos/IRepositorioEmpresas'
import { EmpresaORM } from '../persistencia/Empresa.orm'

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async obtenerTodas(): Promise<EmpresaPersistenciaDTO[]> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresas = await empresaORM.find()

      return empresas.map((empresa) => {
        return {
          id: empresa.uuid,
          correoElectronico: empresa.correo_electronico,
          estatus: empresa.estatus,
          nombre: empresa.nombre,
          requisitosEspeciales: empresa.requisitos_especiales,
        }
      })
    } catch {}
  }
  public async obtenerPorId(id: string): Promise<EmpresaPersistenciaDTO> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresa = await empresaORM.findOneOrFail({ where: { uuid: id } })

      return {
        id: empresa.uuid,
        correoElectronico: empresa.correo_electronico,
        estatus: empresa.estatus,
        nombre: empresa.nombre,
        requisitosEspeciales: empresa.requisitos_especiales,
      }
    } catch {}
  }
}
