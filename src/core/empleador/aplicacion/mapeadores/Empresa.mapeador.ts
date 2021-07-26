import { Empresa } from '../../dominio/entidades/Empresa'
import {
  DatosCrearDireccionEmpresa,
  DatosCrearHabilidadEmpresa,
  DatosEditarPerfilEmpresa,
} from '../../dominio/servicios/EditarPerfilEmpresa'
import {
  DatosRestaurarDireccion,
  DatosRestaurarEmpresa,
  DatosRestaurarHabilidad,
} from '../../dominio/servicios/RestaurarEmpresa'
import { CorreoElectronicoEmpresa } from '../../dominio/values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../../dominio/values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../../dominio/values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../../dominio/values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../../dominio/values/empresa/RequisitosEspecialesEmpresa'
import { EditarPerfilEmpresaComandoDTO } from '../dto/comandos/EditarPerfilEmpresa.comando'
import { ObtenerPerfilEmpresaRespuestaDTO } from '../dto/queries/ObtenerPerfilEmpresa.query'
import {
  DatosBasicosEmpresaPersistenciaDTO,
  EmpresaPersistenciaDTO,
} from '../puertos/IRepositorioEmpresas'
import { HabilidadMapeador } from './Habilidad.mapeador'

export abstract class EmpresaMapeador {
  public static convertirPersistenciaEnDominio(
    datosEmpresa: EmpresaPersistenciaDTO,
    datosDireccion: DatosRestaurarDireccion,
    datosHabilidades: DatosRestaurarHabilidad[],
  ): DatosRestaurarEmpresa {
    return {
      identificador: IdentificadorEmpresa.crear(datosEmpresa.id),
      correoElectronico: CorreoElectronicoEmpresa.crear(
        datosEmpresa.correoElectronico,
      ),
      estatus: EstatusEmpresa.crear(datosEmpresa.estatus as any),
      nombre: NombreEmpresa.crear(datosEmpresa.nombreEmpresa),
      requisitosEspeciales: RequisitosEspecialesEmpresa.crear(
        datosEmpresa.requisitosEspeciales,
      ),
      direccion: datosDireccion,
      habilidades: datosHabilidades,
    }
  }

  public static convertirDominioEnRespuesta(
    empresa: Empresa,
  ): ObtenerPerfilEmpresaRespuestaDTO {
    const direccion = empresa.obtenerDireccion()
    const habilidades = empresa.obtenerHabilidades()

    return {
      nombre: empresa.obtenerNombre(),
      correo: empresa.obtenerCorreoElectronico(),
      requisitosEspeciales: empresa.obtenerRequisitosEspeciales(),
      calleUno: direccion?.obtenerCalleUno(),
      calleDos: direccion?.obtenerCalleDos(),
      codigoPostal: direccion?.obtenerCodigoPostal(),
      idCiudad: direccion?.obtenerIdentificadorCiudad(),
      idEstado: direccion?.obtenerIdentificadorEstado(),
      idPais: direccion?.obtenerIdentificadorPais(),
      habilidades: HabilidadMapeador.convertirDominioEnRespuesta(habilidades),
    }
  }

  public static convertirComandoEnEditarPerfil(
    comando: EditarPerfilEmpresaComandoDTO,
    direccion: DatosCrearDireccionEmpresa,
    habilidades: DatosCrearHabilidadEmpresa[],
  ): DatosEditarPerfilEmpresa {
    return {
      nombre: NombreEmpresa.crear(comando.nombre),
      requisitosEspeciales: RequisitosEspecialesEmpresa.crear(
        comando.requisitosEspeciales,
      ),
      direccion,
      habilidades,
    }
  }

  public static convertirDominioEnPersistencia(
    empresa: Empresa,
  ): DatosBasicosEmpresaPersistenciaDTO {
    return {
      id: empresa.obtenerIdentificador(),
      nombreEmpresa: empresa.obtenerNombre(),
      requisitosEspeciales: empresa.obtenerRequisitosEspeciales(),
    }
  }
}
