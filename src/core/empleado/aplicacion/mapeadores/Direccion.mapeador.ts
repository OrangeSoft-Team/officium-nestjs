import { Direccion } from '../../dominio/entidades/Direccion'
import { DatosRegistroDireccion } from '../../dominio/servicios/RegistrarEmpleado'
import { DatosRestaurarDireccion } from '../../dominio/servicios/RestaurarEmpleado'
import { IdentificadorCiudad } from '../../dominio/values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../../dominio/values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../../dominio/values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../../dominio/values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../../dominio/values/direccion/IdentificadorDireccion'
import { RegistrarDireccionComandoDTO } from '../dto/comandos/RegistrarEmpleado.comando'
import { DireccionPersistenciaDTO } from '../puertos/IRepositorioDirecciones'

export abstract class DireccionMapeador {
  public static convertirDominioEnPersistencia(
    direccion: Direccion,
  ): DireccionPersistenciaDTO {
    return {
      id: direccion.obtenerIdentificador().obtenerId(),
      calleUno: direccion.obtenerCalleUno().obtenerCalle(),
      calleDos: direccion.obtenerCalleDos()?.obtenerCalle(),
      codigoPostal: direccion.obtenerCodigoPostal().obtenerCodigo(),
      idCiudad: direccion.obtenerIdentificadorCiudad().obtenerId(),
    }
  }

  public static convertirComandoEnDatosRegistro(
    id: string,
    comando: RegistrarDireccionComandoDTO,
  ): DatosRegistroDireccion {
    return {
      identificador: IdentificadorDireccion.crear(id),
      calleUno: CalleUnoDireccion.crear(comando.calleUno),
      calleDos: CalleDosDireccion.crear(comando.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(comando.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(comando.idCiudad),
    }
  }

  public static convertirPersistenciaEnDominio(
    datos: DireccionPersistenciaDTO,
  ): DatosRestaurarDireccion {
    return {
      identificador: IdentificadorDireccion.crear(datos.id),
      calleUno: CalleUnoDireccion.crear(datos.calleUno),
      calleDos: CalleDosDireccion.crear(datos.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(datos.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(datos.idCiudad),
    }
  }
}
