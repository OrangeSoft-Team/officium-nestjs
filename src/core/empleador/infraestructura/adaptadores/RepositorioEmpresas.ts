import { compare } from 'bcrypt'
import { getRepository } from 'typeorm'
import {
  DatosAutentificacionPersistenciaDTO,
  DatosBasicosEmpresaPersistenciaDTO,
  EmpresaPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../aplicacion/puertos/IRepositorioEmpresas'
import { EmpresaORM } from '../persistencia/Empresa.orm'

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async actualizarDatos(
    datosBasicos: DatosBasicosEmpresaPersistenciaDTO,
  ): Promise<void> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresa = await empresaORM.findOneOrFail({
        where: { uuid: datosBasicos.id },
      })

      empresa.nombre = datosBasicos.nombreEmpresa
      empresa.requisitos_especiales = datosBasicos.requisitosEspeciales

      await empresaORM.save(empresa)
    } catch {}
  }

  public async obtener(id: string): Promise<EmpresaPersistenciaDTO> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      const empresa = await empresaORM
        .createQueryBuilder('empresas')
        .innerJoinAndSelect('empresas.direccion', 'direccion')
        .where('empresas.uuid = :id', { id })
        .getOneOrFail()

      return {
        id: empresa.uuid,
        correoElectronico: empresa.correo_electronico,
        estatus: empresa.estatus,
        nombreEmpresa: empresa.nombre,
        requisitosEspeciales: empresa.requisitos_especiales,
        idDireccion: empresa.direccion.uuid,
      }
    } catch {}
  }

  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    try {
      const empresaORM = getRepository(EmpresaORM)

      console.info(query)

      const empresa = await empresaORM.findOneOrFail({
        where: {
          correo_electronico: query.correoElectronico,
        },
      })
      console.info(empresa)

      console.info(empresa.token)
      console.info(await compare(query.token, empresa.token))

      return {
        id: empresa.uuid,
        nombreEmpresa: empresa.nombre,
        valido: await compare(query.token, empresa.token),
      }
    } catch {
      return {
        valido: false,
      }
    }
  }
}
