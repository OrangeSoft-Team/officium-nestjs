import { Entidad } from '../../../../comun/dominio/Entidad'
import { IdentificadorCiudad } from '../values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { IdentificadorEstado } from '../values/estado/IdentificadorEstado'
import { IdentificadorPais } from '../values/pais/IdentificadorPais'

export interface DatosDireccion {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  identificadorCiudad: IdentificadorCiudad
  identificadorEstado: IdentificadorEstado
  identificadorPais: IdentificadorPais
}

export class Direccion extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorDireccion,
    private calleUno: CalleUnoDireccion,
    private calleDos: CalleDosDireccion,
    private codigoPostal: CodigoPostalDireccion,
    private identificadorCiudad: IdentificadorCiudad,
    private identificadorEstado: IdentificadorEstado,
    private identificadorPais: IdentificadorPais,
  ) {
    super()
  }

  public esIgual(direccion: Direccion): boolean {
    return this.identificador.esIgual(direccion.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerCalleUno() {
    return this.calleUno.obtenerCalle()
  }

  public obtenerCalleDos() {
    return this.calleDos.obtenerCalle()
  }

  public obtenerCodigoPostal() {
    return this.codigoPostal.obtenerCodigo()
  }

  public obtenerIdentificadorCiudad() {
    return this.identificadorCiudad.obtenerId()
  }

  public obtenerIdentificadorEstado() {
    return this.identificadorEstado.obtenerId()
  }

  public obtenerIdentificadorPais() {
    return this.identificadorPais.obtenerId()
  }

  public static crear(datos: DatosDireccion): Direccion {
    return new Direccion(
      datos.identificador,
      datos.calleUno,
      datos.calleDos,
      datos.codigoPostal,
      datos.identificadorCiudad,
      datos.identificadorEstado,
      datos.identificadorPais,
    )
  }

  public static restaurar(datos: DatosDireccion): Direccion {
    return new Direccion(
      datos.identificador,
      datos.calleUno,
      datos.calleDos,
      datos.codigoPostal,
      datos.identificadorCiudad,
      datos.identificadorEstado,
      datos.identificadorPais,
    )
  }
}
