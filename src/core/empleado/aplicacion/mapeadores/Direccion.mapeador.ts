import { Direccion } from '../../dominio/Direccion'
import { IdentificadorCiudad } from '../../dominio/values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../../dominio/values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../../dominio/values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../../dominio/values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../../dominio/values/direccion/IdentificadorDireccion'
import { RegistrarEmpleadoDireccionDTO } from '../dto/RegistrarEmpleado.comando'
import { CrearDireccionComandoDTO } from '../puertos/IRepositorioDirecciones'

export abstract class DireccionMapeador {
  public static transformarSolicitudEnEntidad(
    solicitud: RegistrarEmpleadoDireccionDTO,
    id: string,
  ): Direccion {
    return Direccion.crear({
      identificador: IdentificadorDireccion.crear(id),
      calleUno: CalleUnoDireccion.crear(solicitud.calleUno),
      calleDos: CalleDosDireccion.crear(solicitud.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(solicitud.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(id),
    })
  }

  public static transformarEntidadEnPersistencia(
    entidad: Direccion,
  ): CrearDireccionComandoDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      calleUno: entidad.obtenerCalleUno().obtenerCalle(),
      calleDos: entidad.obtenerCalleDos()?.obtenerCalle(),
      codigoPostal: entidad.obtenerCodigoPostal().obtenerCodigo(),
      idCiudad: entidad.obtenerIdentificadorCiudad().obtenerId(),
    }
  }
}
