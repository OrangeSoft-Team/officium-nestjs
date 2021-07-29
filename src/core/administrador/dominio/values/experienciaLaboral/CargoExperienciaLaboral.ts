import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import {
  CargoExperienciaLaboralVacio,
  LongitudInvalidaCargoExperienciaLaboral,
} from '../../excepciones/experienciaLaboral/CargoExperienciaLaboral.excepciones'

export class CargoExperienciaLaboral implements IValueObject {
  private constructor(private readonly cargo: string) {}

  public obtenerCargo() {
    return this.cargo
  }

  public esIgual(cargoExperiencia: CargoExperienciaLaboral): boolean {
    return this.cargo == cargoExperiencia.cargo
  }

  public static crear(cargo: string): CargoExperienciaLaboral {
    if (!cargo)
      throw new CargoExperienciaLaboralVacio(
        'El cargo de la experiencia laboral no puede estar vacío.',
      )

    if (cargo.length < 4)
      throw new LongitudInvalidaCargoExperienciaLaboral(
        'El cargo de la experiencia laboral debe contener como mínimo 4 caracteres.',
      )

    if (cargo.length > 40)
      throw new LongitudInvalidaCargoExperienciaLaboral(
        'El cargo de la experiencia laboral debe contener como máximo 40 caracteres.',
      )

    return new CargoExperienciaLaboral(cargo)
  }
}
