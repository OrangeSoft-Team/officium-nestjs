import { Entidad } from './Entidad'
import { Ciudad } from './Ciudad'
import { CalleDireccion } from './values/CalleDireccion'
import { CodigoPostalDireccion } from './values/CodigoPostalDireccion'
import { Identificador } from './values/Identificador'

export interface DatosDireccion {
  identificador: Identificador
  calle: CalleDireccion
  codigoPostal: CodigoPostalDireccion
  ciudad: Ciudad
}

export class Direccion extends Entidad {
  private constructor(
    identificador: Identificador,
    private calle: CalleDireccion,
    private codigoPostal: CodigoPostalDireccion,
    private ciudad: Ciudad,
  ) {
    super(identificador)
  }

  public static crear(datos: DatosDireccion): Direccion {
    return new Direccion(
      datos.identificador,
      datos.calle,
      datos.codigoPostal,
      datos.ciudad,
    )
  }
}
