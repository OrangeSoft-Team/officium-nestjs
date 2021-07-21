import { Empleado } from '../../dominio/entidades/Empleado'
import {
  DatosRegistroDireccion,
  DatosRegistroEmpleado,
} from '../../dominio/servicios/RegistrarEmpleado'
import { CorreoElectronicoEmpleado } from '../../dominio/values/empleado/CorreoElectronicoEmpleado'
import { FechaNacimientoEmpleado } from '../../dominio/values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../../dominio/values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../../dominio/values/empleado/IdentificadorEmpleado'
import { NivelEducativoEmpleado } from '../../dominio/values/empleado/NivelEducativoEmpleado'
import { NombreCompletoEmpleado } from '../../dominio/values/empleado/NombreCompletoEmpleado'
import { NumeroTelefonicoEmpleado } from '../../dominio/values/empleado/NumeroTelefonicoEmpleado'
import { RegistrarEmpleadoComandoDTO } from '../dto/RegistrarEmpleado.comando'
import { EmpleadoPersistenciaDTO } from '../puertos/IRepositorioEmpleados'

export abstract class EmpleadoMapeador {
  public static convertirDominioEnPersistencia(
    empleado: Empleado,
    token?: string,
  ): EmpleadoPersistenciaDTO {
    return {
      id: empleado.obtenerIdentificador().obtenerId(),
      correoElectronico: empleado.obtenerCorreoElectronico().obtenerCorreo(),
      estatus: empleado.obtenerEstatus().obtenerEstatus(),
      fechaNacimiento: empleado.obtenerFechaNacimiento().obtenerFecha(),
      genero: empleado.obtenerGenero().obtenerGenero(),
      nivelEducativo: empleado.obtenerNivelEducativo().obtenerNivel(),
      primerNombre: empleado.obtenerNombreCompleto().obtenerPrimerNombre(),
      primerApellido: empleado.obtenerNombreCompleto().obtenerPrimerApellido(),
      segundoNombre: empleado.obtenerNombreCompleto()?.obtenerSegundoNombre(),
      segundoApellido: empleado
        .obtenerNombreCompleto()
        ?.obtenerSegundoApellido(),
      telefono: empleado.obtenerNumeroTelefonico().obtenerNumero(),
      idDireccion: empleado
        .obtenerDireccion()
        .obtenerIdentificador()
        .obtenerId(),
      token,
    }
  }

  public static convertirComandoEnDatosRegistro(
    id: string,
    comando: RegistrarEmpleadoComandoDTO,
    direccion: DatosRegistroDireccion,
  ): DatosRegistroEmpleado {
    return {
      identificador: IdentificadorEmpleado.crear(id),
      correoElectronico: CorreoElectronicoEmpleado.crear(
        comando.correoElectronico,
      ),
      fechaNacimiento: FechaNacimientoEmpleado.crear(comando.fechaNacimiento),
      genero: GeneroEmpleado.crear(comando.genero as any),
      nivelEducativo: NivelEducativoEmpleado.crear(
        comando.nivelEducativo as any,
      ),
      nombreCompleto: NombreCompletoEmpleado.crear(
        comando.primerNombre,
        comando.primerApellido,
        comando.segundoNombre,
        comando.segundoApellido,
      ),
      numeroTelefonico: NumeroTelefonicoEmpleado.crear(comando.telefono),
      direccion,
    }
  }
}
