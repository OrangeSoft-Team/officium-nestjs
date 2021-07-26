import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CargoAdministradorVacio,
  LongitudInvalidaCargoAdministrador,
} from '../../excepciones/administrador/CargoAdministrador.excepciones'

export class CargoAdministrador implements IValueObject {
  private constructor(private readonly cargo: string) {}

  public obtenerCargo() {
    return this.cargo
  }

  public esIgual(cargoAdmin: CargoAdministrador): boolean {
    return this.cargo == cargoAdmin.cargo
  }

  public static crear(cargo: string): CargoAdministrador {
    if (!cargo)
      throw new CargoAdministradorVacio(
        'El cargo del administrador no puede estar vacío.',
      )

    if (cargo.length < 4)
      throw new LongitudInvalidaCargoAdministrador(
        'El cargo del administrador debe contener como mínimo 4 caracteres.',
      )

    if (cargo.length > 40)
      throw new LongitudInvalidaCargoAdministrador(
        'El cargo del administrador debe contener como máximo 40 caracteres.',
      )

    return new CargoAdministrador(cargo)
  }
}
