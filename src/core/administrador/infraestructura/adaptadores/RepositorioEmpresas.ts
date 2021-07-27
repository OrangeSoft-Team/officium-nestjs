import { hash } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  EmpresaPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../aplicacion/puertos/IRepositorioEmpresas'
import { EmpresaORM } from '../persistencia/Empresa.orm'

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async editar(datos: EmpresaPersistenciaDTO): Promise<void> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresa = await empresaORM.findOneOrFail({
        where: { uuid: datos.id },
      })

      empresa.nombre = datos.nombre
      empresa.estatus = datos.estatus
      empresa.requisitos_especiales = datos.requisitosEspeciales

      await empresaORM.save(empresa)
    } catch {}
  }

  public async crear(datos: EmpresaPersistenciaDTO): Promise<void> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresa = empresaORM.create({
        uuid: datos.id,
        correo_electronico: datos.correoElectronico,
        estatus: datos.estatus,
        nombre: datos.nombre,
        requisitos_especiales: datos.requisitosEspeciales,
        token: await hash(datos.token, 10),
      })

      await empresaORM.insert(empresa)
    } catch {}
  }

  public async existe(correo: string): Promise<boolean> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      await empresaORM.findOneOrFail({ where: { correo_electronico: correo } })

      return true
    } catch {
      return false
    }
  }

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
