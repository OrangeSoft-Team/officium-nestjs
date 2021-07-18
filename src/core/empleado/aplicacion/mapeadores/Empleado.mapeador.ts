import { Direccion } from '../../dominio/Direccion'
import { Empleado } from '../../dominio/Empleado'
import { CorreoElectronicoEmpleado } from '../../dominio/values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../../dominio/values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../../dominio/values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../../dominio/values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../../dominio/values/empleado/IdentificadorEmpleado'
import { NivelEducativoEmpleado } from '../../dominio/values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from '../../dominio/values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from '../../dominio/values/empleado/NumeroTelefonicoEmpleado'
import { RegistrarEmpleadoComandoDTO } from '../dto/RegistrarEmpleado.comando'
import { CrearEmpleadoComandoDTO } from '../puertos/IRepositorioEmpleados'

export abstract class EmpleadoMapeador {
  public static transformarSolicitudEnEntidad(
    solicitud: RegistrarEmpleadoComandoDTO,
    id: string,
    direccion: Direccion,
  ): Empleado {
    return Empleado.crear({
      identificador: IdentificadorEmpleado.crear(id),
      nombreCompleto: NombreCompletoEmpleado.crear(
        solicitud.primerNombre,
        solicitud.primerApellido,
        solicitud.segundoNombre,
        solicitud.segundoApellido,
      ),
      correoElectronico: CorreoElectronicoEmpleado.crear(
        solicitud.correoElectronico,
      ),
      numeroTelefonico: NumeroTelefonicoEmpleado.crear(solicitud.telefono),
      nivelEducativo: NivelEducativoEmpleado.crear(
        solicitud.nivelEducativo as any,
      ),
      genero: GeneroEmpleado.crear(solicitud.genero as any),
      fechaNacimiento: FechaNacimientoEmpleado.crear(solicitud.fechaNacimiento),
      estatus: EstatusEmpleado.crear('DISPONIBLE'),
      direccion,
    })
  }

  public static transformarEntidadEnPersistencia(
    entidad: Empleado,
    token: string,
  ): CrearEmpleadoComandoDTO {
    return {
      id: entidad.obtenerIdentificador().obtenerId(),
      correoElectronico: entidad.obtenerCorreoElectronico().obtenerCorreo(),
      estatus: entidad.obtenerEstatus().obtenerEstatus(),
      fechaNacimiento: entidad.obtenerFechaNacimiento().obtenerFecha(),
      genero: entidad.obtenerGenero().obtenerGenero(),
      nivelEducativo: entidad.obtenerNivelEducativo().obtenerNivel(),
      telefono: entidad.obtenerNumeroTelefonico().obtenerNumero(),
      primerNombre: entidad.obtenerNombreCompleto().obtenerPrimerNombre(),
      primerApellido: entidad.obtenerNombreCompleto().obtenerPrimerApellido(),
      segundoNombre: entidad.obtenerNombreCompleto()?.obtenerSegundoNombre(),
      segundoApellido: entidad
        .obtenerNombreCompleto()
        ?.obtenerSegundoApellido(),
      idDireccion: entidad
        .obtenerDireccion()
        .obtenerIdentificador()
        .obtenerId(),
      token,
    }
  }
}
