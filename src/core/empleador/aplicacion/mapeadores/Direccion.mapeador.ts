import { Direccion } from '../../dominio/entidades/Direccion'
import { DatosCrearDireccionEmpresa } from '../../dominio/servicios/EditarPerfilEmpresa'
import { DatosRestaurarDireccion } from '../../dominio/servicios/RestaurarEmpresa'
import { IdentificadorCiudad } from '../../dominio/values/ciudad/IdentificadorCiudad'
import { CalleDosDireccion } from '../../dominio/values/direccion/CalleDosDireccion'
import { CalleUnoDireccion } from '../../dominio/values/direccion/CalleUnoDireccion'
import { CodigoPostalDireccion } from '../../dominio/values/direccion/CodigoPostalDireccion'
import { IdentificadorDireccion } from '../../dominio/values/direccion/IdentificadorDireccion'
import { IdentificadorEstado } from '../../dominio/values/estado/IdentificadorEstado'
import { IdentificadorPais } from '../../dominio/values/pais/IdentificadorPais'
import { DatosCrearDireccionComandoDTO } from '../dto/comandos/EditarPerfilEmpresa.comando'
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
      identificadorEstado: IdentificadorEstado.crear(datos.idEstado),
      identificadorPais: IdentificadorPais.crear(datos.idPais),
    }
  }

  public static convertirComandoCrearDireccion(
    comando: DatosCrearDireccionComandoDTO & { id: string },
  ): DatosCrearDireccionEmpresa {
    return {
      identificador: IdentificadorDireccion.crear(comando.id),
      calleUno: CalleUnoDireccion.crear(comando.calleUno),
      calleDos: CalleDosDireccion.crear(comando.calleDos),
      codigoPostal: CodigoPostalDireccion.crear(comando.codigoPostal),
      identificadorCiudad: IdentificadorCiudad.crear(comando.idCiudad),
      identificadorEstado: IdentificadorEstado.crear(comando.idEstado),
      identificadorPais: IdentificadorPais.crear(comando.idPais),
    }
  }

  public static convertirDominioEnPersistencia(
    direccion: Direccion,
  ): DireccionPersistenciaDTO {
    return {
      id: direccion.obtenerIdentificador(),
      calleUno: direccion.obtenerCalleUno(),
      calleDos: direccion.obtenerCalleDos(),
      codigoPostal: direccion.obtenerCodigoPostal(),
      idCiudad: direccion.obtenerIdentificadorCiudad(),
      idEstado: direccion.obtenerIdentificadorEstado(),
      idPais: direccion.obtenerIdentificadorPais(),
    }
  }
}
