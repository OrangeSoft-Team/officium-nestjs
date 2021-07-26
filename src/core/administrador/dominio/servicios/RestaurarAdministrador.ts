import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Administrador } from '../entidades/Administrador'
import { CargoAdministrador } from '../values/administrador/CargoAdministrador'
import { CorreoElectronicoAdministrador } from '../values/administrador/CorreoElectronicoAdministrador'
import { IdentificadorAdministrador } from '../values/administrador/IdentificadorAdministrador'
import { NombreCompletoAdministrador } from '../values/administrador/NombreCompletoAdministrador'

export interface DatosRestaurarAdministrador {
  identificador: IdentificadorAdministrador
  correoElectronico: CorreoElectronicoAdministrador
  nombreCompleto: NombreCompletoAdministrador
  cargo: CargoAdministrador
}

export abstract class RestaurarAdministrador implements IServicioDominio {
  public static restaurar(datos: DatosRestaurarAdministrador): Administrador {
    return Administrador.restaurar(datos)
  }
}
