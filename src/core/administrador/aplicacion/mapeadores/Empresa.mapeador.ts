import { Empresa } from '../../dominio/entidades/Empresa'
import { DatosRestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import { CorreoElectronicoEmpresa } from '../../dominio/values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../../dominio/values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../../dominio/values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../../dominio/values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../../dominio/values/empresa/RequisitosEspecialesEmpresa'
import { CrearEmpresaComandoDTO } from '../dto/comandos/CrearEmpresa.comando'
import { VerDetalleEmpresaRespuestaDTO } from '../dto/queries/VerDetalleEmpresa.query'
import { VerListaEmpresasRespuestaDTO } from '../dto/queries/VerListaEmpresas.query'
import { EmpresaPersistenciaDTO } from '../puertos/IRepositorioEmpresas'
import { DatosCrearEmpresa } from '../../dominio/servicios/CrearEmpresa'
import { EditarEmpresaComandoDTO } from '../dto/comandos/EditarEmpresa.comando'
import { DatosEditarEmpresa } from '../../dominio/servicios/EditarEmpresa'

export abstract class EmpresaMapeador {
  public static convertirPersistenciaEnDominio(
    datos: EmpresaPersistenciaDTO,
  ): DatosRestaurarEmpresa {
    return {
      identificador: IdentificadorEmpresa.crear(datos.id),
      correoElectronico: CorreoElectronicoEmpresa.crear(
        datos.correoElectronico,
      ),
      estatus: EstatusEmpresa.crear(datos.estatus as any),
      nombre: NombreEmpresa.crear(datos.nombre),
      requisitosEspeciales: RequisitosEspecialesEmpresa.crear(
        datos.requisitosEspeciales,
      ),
    }
  }

  public static convertirDominioEnPersistencia(
    empresa: Empresa,
  ): EmpresaPersistenciaDTO {
    return {
      id: empresa.obtenerIdentificador(),
      correoElectronico: empresa.obtenerCorreoElectronico(),
      estatus: empresa.obtenerEstatus(),
      nombre: empresa.obtenerNombre(),
      requisitosEspeciales: empresa.obtenerRequisitosEspeciales(),
    }
  }

  public static convertirComandoEditarEmpresa(
    datos: EditarEmpresaComandoDTO,
  ): DatosEditarEmpresa {
    return {
      nombre: NombreEmpresa.crear(datos.nombre),
      estatus: EstatusEmpresa.crear(datos.estatus as any),
      requisitosEspeciales: RequisitosEspecialesEmpresa.crear(
        datos.requisitosEspeciales,
      ),
    }
  }

  public static convertirComandoCrearEmpresa(
    id: string,
    datos: CrearEmpresaComandoDTO,
  ): DatosCrearEmpresa {
    return {
      identificador: IdentificadorEmpresa.crear(id),
      correoElectronico: CorreoElectronicoEmpresa.crear(
        datos.correoElectronico,
      ),
      nombre: NombreEmpresa.crear(datos.nombre),
      requisitosEspeciales: RequisitosEspecialesEmpresa.crear(
        datos.requisitosEspeciales,
      ),
    }
  }

  public static convertirDominioEnDetalleRespuesta(
    empresa: Empresa,
  ): VerDetalleEmpresaRespuestaDTO {
    return {
      id: empresa.obtenerIdentificador(),
      correoElectronico: empresa.obtenerCorreoElectronico(),
      estatus: empresa.obtenerEstatus(),
      nombre: empresa.obtenerNombre(),
      requisitosEspeciales: empresa.obtenerRequisitosEspeciales(),
    }
  }

  public static convertirDominioEnListadoRespuesta(
    empresas: Empresa[],
  ): VerListaEmpresasRespuestaDTO[] {
    return empresas.map((empresa) => {
      return {
        id: empresa.obtenerIdentificador(),
        correoElectronico: empresa.obtenerCorreoElectronico(),
        estatus: empresa.obtenerEstatus(),
        nombre: empresa.obtenerNombre(),
      }
    })
  }
}
