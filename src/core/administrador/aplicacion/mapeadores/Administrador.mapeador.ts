import { Administrador } from '../../dominio/entidades/Administrador'
import { DatosEditarPerfilAdministrador } from '../../dominio/servicios/EditarPerfilAdministrador'
import { DatosRestaurarAdministrador } from '../../dominio/servicios/RestaurarAdministrador'
import { CargoAdministrador } from '../../dominio/values/administrador/CargoAdministrador'
import { CorreoElectronicoAdministrador } from '../../dominio/values/administrador/CorreoElectronicoAdministrador'
import { IdentificadorAdministrador } from '../../dominio/values/administrador/IdentificadorAdministrador'
import { NombreCompletoAdministrador } from '../../dominio/values/administrador/NombreCompletoAdministrador'
import { EditarPerfilAdministradorComandoDTO } from '../dto/comandos/EditarPerfilAdministrador.comando'
import { ObtenerPerfilAdministradorRespuestaDTO } from '../dto/queries/ObtenerPerfilAdministrador.query'
import { AdministradorPersistenciaDTO } from '../puertos/IRepositorioAdministradores'

export abstract class AdministradorMapeador {
  public static convertirComandoEnEditarPerfil(
    comando: EditarPerfilAdministradorComandoDTO,
  ): DatosEditarPerfilAdministrador {
    return {
      nombreCompleto: NombreCompletoAdministrador.crear(
        comando.primerNombre,
        comando.primerApellido,
      ),
      cargo: CargoAdministrador.crear(comando.cargo),
    }
  }

  public static convertirPersistenciaEnDominio(
    datos: AdministradorPersistenciaDTO,
  ): DatosRestaurarAdministrador {
    return {
      identificador: IdentificadorAdministrador.crear(datos.id),
      cargo: CargoAdministrador.crear(datos.cargo),
      correoElectronico: CorreoElectronicoAdministrador.crear(
        datos.correoElectronico,
      ),
      nombreCompleto: NombreCompletoAdministrador.crear(
        datos.primerNombre,
        datos.primerApellido,
      ),
    }
  }

  public static convertirDominioEnPersistencia(
    administrador: Administrador,
  ): AdministradorPersistenciaDTO {
    return {
      id: administrador.obtenerIdentificador(),
      primerNombre: administrador.obtenerPrimerNombre(),
      primerApellido: administrador.obtenerPrimerApellido(),
      cargo: administrador.obtenerCargo(),
      correoElectronico: administrador.obtenerCorreoElectronico(),
    }
  }

  public static convertirDominioEnRespuesta(
    administrador: Administrador,
  ): ObtenerPerfilAdministradorRespuestaDTO {
    return {
      cargo: administrador.obtenerCargo(),
      correoElectronico: administrador.obtenerCorreoElectronico(),
      primerNombre: administrador.obtenerPrimerNombre(),
      primerApellido: administrador.obtenerPrimerApellido(),
    }
  }
}
