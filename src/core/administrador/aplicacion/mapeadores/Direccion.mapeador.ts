import { Direccion } from '../../dominio/entidades/Direccion'
import { DatosRestaurarDireccion } from '../../dominio/servicios/RestaurarEmpleado'
import { IdentificadorCiudad } from '../../dominio/values/ciudad/IdentificadorCiudad'
import { NombreCiudad } from '../../dominio/values/ciudad/NombreCiudad'
import { CalleDosDireccion } from '../../dominio/values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../../dominio/values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../../dominio/values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../../dominio/values/direccion/IdentificadorDireccion'
import { IdentificadorEstado } from '../../dominio/values/estado/IdentificadorEstado'
import { NombreEstado } from '../../dominio/values/estado/NombreEstado'
import { IdentificadorPais } from '../../dominio/values/pais/IdentificadorPais'
import { NombrePais } from '../../dominio/values/pais/NombrePais'
import { DireccionPersistenciaDTO } from '../puertos/IRepositorioDirecciones'

export abstract class DireccionMapeador {
  public static convertirPersistenciaEnDominio(
    datos: DireccionPersistenciaDTO,
  ): DatosRestaurarDireccion {
    return {
      identificador: IdentificadorDireccion.crear(datos.id),
      calleUno: CalleUnoDireccion.crear(datos.calleUno),
      calleDos: CalleDosDireccion.crear(datos.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(datos.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(datos.idCiudad),
      nombreCiudad: NombreCiudad.crear(datos.nombreCiudad),
      identificadorEstado: IdentificadorEstado.crear(datos.idEstado),
      nombreEstado: NombreEstado.crear(datos.nombreEstado),
      identificadorPais: IdentificadorPais.crear(datos.idPais),
      nombrePais: NombrePais.crear(datos.nombrePais),
    }
  }

  public static convertirDominioEnRespuesta(direccion: Direccion) {
    const pais = direccion.obtenerPais()
    const estado = direccion.obtenerEstado()
    const ciudad = direccion.obtenerCiudad()
    return {
      calleUno: direccion.obtenerCalleUno(),
      calleDos: direccion.obtenerCalleDos(),
      codigoPostal: direccion.obtenerCodigoPostal(),
      nombrePais: pais.obtenerNombre(),
      nombreEstado: estado.obtenerNombre(),
      nombreCiudad: ciudad.obtenerNombre(),
    }
  }
}
