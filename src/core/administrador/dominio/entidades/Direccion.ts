import { Entidad } from '../../../../comun/dominio/Entidad'
import { CalleDosDireccion } from '../values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../values/direccion/IdentificadorDireccion'
import { Ciudad } from './Ciudad'
import { Estado } from './Estado'
import { Pais } from './Pais'

export interface DatosDireccion {
  identificador: IdentificadorDireccion
  calleUno: CalleUnoDireccion
  calleDos: CalleDosDireccion
  codigoPostal: CodigoPostalDireccion
  ciudad: Ciudad
  estado: Estado
  pais: Pais
}

export class Direccion extends Entidad {
  public constructor(
    private readonly identificador: IdentificadorDireccion,
    private calleUno: CalleUnoDireccion,
    private calleDos: CalleDosDireccion,
    private codigoPostal: CodigoPostalDireccion,
    private ciudad: Ciudad,
    private estado: Estado,
    private pais: Pais,
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

  public obtenerPais() {
    return this.pais
  }

  public obtenerEstado() {
    return this.estado
  }

  public obtenerCiudad() {
    return this.ciudad
  }

  public static restaurar(datos: DatosDireccion): Direccion {
    return new Direccion(
      datos.identificador,
      datos.calleUno,
      datos.calleDos,
      datos.codigoPostal,
      datos.ciudad,
      datos.estado,
      datos.pais,
    )
  }
}
