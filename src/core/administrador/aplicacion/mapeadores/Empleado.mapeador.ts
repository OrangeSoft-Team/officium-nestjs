import { Empleado } from '../../dominio/entidades/Empleado'
import { DatosRestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import { CorreoElectronicoEmpleado } from '../../dominio/values/empleado/CorreoElectronicoEmpleado'
import { EstatusEmpleado } from '../../dominio/values/empleado/EstatusEmpleado'
import { FechaNacimientoEmpleado } from '../../dominio/values/empleado/FechaNacimientoEmpleado'
import { GeneroEmpleado } from '../../dominio/values/empleado/GeneroEmpleado'
import { IdentificadorEmpleado } from '../../dominio/values/empleado/IdentificadorEmpleado'
import { NombreCompletoEmpleado } from '../../dominio/values/empleado/NombreCompletoEmpleado'
import { ListarEmpleadosRespuestaDTO } from '../dto/queries/ListarEmpleados.query'
import { EmpleadoPersistenciaDTO } from '../puertos/IRepositorioEmpleados'

export abstract class EmpleadoMapeador {
  public static convertirPersistenciaEnDominio(
    datos: EmpleadoPersistenciaDTO,
  ): DatosRestaurarEmpleado {
    return {
      identificador: IdentificadorEmpleado.crear(datos.id),
      correoElectronico: CorreoElectronicoEmpleado.crear(
        datos.correoElectronico,
      ),
      estatus: EstatusEmpleado.crear(datos.estatus as any),
      genero: GeneroEmpleado.crear(datos.genero as any),
      fechaNacimiento: FechaNacimientoEmpleado.crear(datos.fechaNacimiento),
      nombreCompleto: NombreCompletoEmpleado.crear(
        datos.primerNombre,
        datos.primerApellido,
        datos.segundoNombre,
        datos.segundoApellido,
      ),
    }
  }

  public static convertirDominioEnListadoRespuesta(
    empleado: Empleado,
  ): ListarEmpleadosRespuestaDTO {
    return {
      id: empleado.obtenerIdentificador(),
      correoElectronico: empleado.obtenerCorreoElectronico(),
      primerNombre: empleado.obtenerPrimerNombre(),
      primerApellido: empleado.obtenerPrimerApellido(),
      genero: empleado.obtenerGenero(),
      estatus: empleado.obtenerEstatus(),
      segundoNombre: empleado.obtenerSegundoNombre(),
      segundoApellido: empleado.obtenerSegundoApellido(),
    }
  }
}
