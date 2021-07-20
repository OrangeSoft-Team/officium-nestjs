import { Empleado } from '../../dominio/entidades/Empleado'
import { DatosRegistroEmpleado } from '../../dominio/servicios/RegistrarEmpleado'
import { RegistrarEmpleadoComandoDTO } from '../dto/RegistrarEmpleado.comando'
import { CrearEmpleadoPersistenciaDTO } from '../puertos/IRepositorioEmpleados'

export abstract class EmpleadoMapeador {
  public static transformarComandoEnDominio(
    comando: RegistrarEmpleadoComandoDTO,
    idEmpleado: string,
    idDireccion: string,
  ): DatosRegistroEmpleado {
    const datosDireccion = comando.direccion
    return {
      idEmpleado,
      correoElectronico: comando.correoElectronico,
      fechaNacimiento: comando.fechaNacimiento,
      genero: comando.genero,
      nivelEducativo: comando.nivelEducativo,
      primerNombre: comando.primerNombre,
      primerApellido: comando.primerApellido,
      segundoNombre: comando.segundoNombre,
      segundoApellido: comando.segundoApellido,
      telefono: comando.telefono,
      // Direccion
      idDireccion,
      ...datosDireccion,
    }
  }

  public static transformarEntidadEnPersistencia(
    empleado: Empleado,
    token: string,
  ): CrearEmpleadoPersistenciaDTO {
    return {
      id: empleado.obtenerIdentificador().obtenerId(),
      correoElectronico: empleado.obtenerCorreoElectronico().obtenerCorreo(),
      estatus: empleado.obtenerEstatus().obtenerEstatus(),
      fechaNacimiento: empleado.obtenerFechaNacimiento().obtenerFecha(),
      genero: empleado.obtenerGenero().obtenerGenero(),
      nivelEducativo: empleado.obtenerNivelEducativo().obtenerNivel(),
      primerNombre: empleado.obtenerNombreCompleto().obtenerPrimerNombre(),
      primerApellido: empleado.obtenerNombreCompleto().obtenerPrimerApellido(),
      telefono: empleado.obtenerNumeroTelefonico().obtenerNumero(),
      segundoNombre: empleado.obtenerNombreCompleto()?.obtenerSegundoNombre(),
      segundoApellido: empleado
        .obtenerNombreCompleto()
        ?.obtenerSegundoApellido(),
      idDireccion: empleado
        .obtenerDireccion()
        .obtenerIdentificador()
        .obtenerId(),
      token,
    }
  }
}
