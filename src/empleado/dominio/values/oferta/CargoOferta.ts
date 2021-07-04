import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  CargoOfertaVacio,
  LongitudInvalidaCargoOferta,
} from '../../excepciones/oferta/CargoOferta.excepciones'

export class CargoOferta extends ValueObject {
  private constructor(private readonly cargo: string) {
    super()
  }

  public obtenerCargo() {
    return this.cargo
  }

  public esIgual(cargoOferta: CargoOferta): boolean {
    return this.cargo == cargoOferta.cargo
  }

  public static crear(cargo: string): CargoOferta {
    // No debe ser vacio
    if (cargo == null || cargo == undefined || cargo == '')
      throw new CargoOfertaVacio(
        'El cargo de la oferta laboral no puede estar vacío.',
      )

    const cargoOferta = new CargoOferta(cargo)

    // Debe contener al menos 4 caracteres
    if (cargo.length < 4)
      throw new LongitudInvalidaCargoOferta(
        'El cargo de la oferta laboral debe contener como mínimo 4 caracteres.',
      )
    // Debe contener como maximo 40 caracteres
    if (cargo.length > 40)
      throw new LongitudInvalidaCargoOferta(
        'El cargo de la oferta laboral debe contener como máximo 40 caracteres.',
      )
    // Si no hay errores
    return cargoOferta
  }
}
