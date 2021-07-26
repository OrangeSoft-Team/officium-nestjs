import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Administrador } from '../entidades/Administrador'
import { CargoAdministrador } from '../values/administrador/CargoAdministrador'
import { NombreCompletoAdministrador } from '../values/administrador/NombreCompletoAdministrador'

export interface DatosEditarPerfilAdministrador {
  nombreCompleto: NombreCompletoAdministrador
  cargo: CargoAdministrador
}

export abstract class EditarPerfilAdministrador implements IServicioDominio {
  public static editar(
    datos: DatosEditarPerfilAdministrador,
    administrador: Administrador,
  ): void {
    administrador.editarPerfil(datos.nombreCompleto, datos.cargo)
  }
}
