import { Entidad } from '../../../../comun/dominio/Entidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'

export interface DatosHabilidad {
  uuidHabilidad: IdentificadorHabilidad
}

export class Habilidad extends Entidad {
  private constructor(
    public readonly uuidHabilidad: IdentificadorHabilidad
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.uuidHabilidad
  }

  public esIgual(habilidad: Habilidad): boolean {
    return this.uuidHabilidad.esIgual(habilidad.obtenerIdentificador())
  }

  public static crear(datos: DatosHabilidad): Habilidad {
    return new Habilidad(datos.uuidHabilidad)
  }

  public static restaurar(datos: DatosHabilidad): Habilidad {
    return new Habilidad(datos.uuidHabilidad)
  }
}
