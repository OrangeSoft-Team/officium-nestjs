import { Entidad } from '../../../comun/dominio/Entidad'
import { IdentificadorCiudad } from './values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from './values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from './values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from './values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from './values/direccion/IdentificadorDireccion'

export interface DatosDireccion {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  identificadorCiudad: IdentificadorCiudad
}

export class Direccion extends Entidad {
  private constructor(
    public identificador: IdentificadorDireccion,
    public calleUno: CalleUnoDireccion,
    public calleDos: CalleDosDireccion,
    public codigoPostal: CodigoPostalDireccion,
    public identificadorCiudad: IdentificadorCiudad,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public obtenerCalleUno() {
    return this.calleUno
  }

  public obtenerCalleDos() {
    return this.calleDos
  }

  public obtenerCodigoPostal() {
    return this.codigoPostal
  }

  public obtenerIdentificadorCiudad() {
    return this.identificadorCiudad
  }

  public static crear(datos: DatosDireccion): Direccion {
    return new Direccion(
      datos.identificador,
      datos.calleUno,
      datos.calleDos,
      datos.codigoPostal,
      datos.identificadorCiudad,
    )
  }
}
