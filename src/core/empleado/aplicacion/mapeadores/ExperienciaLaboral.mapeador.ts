import { ExperienciaLaboral } from '../../dominio/entidades/ExperienciaLaboral'
import { DatosAgregarExperienciaLaboral } from '../../dominio/servicios/AgregarExperienciaLaboralEmpleado'
import { DatosEditarExperienciaLaboral } from '../../dominio/servicios/EditarExperienciaLaboralEmpleado'
import { DatosEliminarExperienciaLaboralEmpleado } from '../../dominio/servicios/EliminarExperienciaLaboralEmpleado'
import { DatosRestaurarExperienciaLaboral } from '../../dominio/servicios/RestaurarEmpleado'
import { IdentificadorEmpleado } from '../../dominio/values/empleado/IdentificadorEmpleado'
import { CargoExperienciaLaboral } from '../../dominio/values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../../dominio/values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../../dominio/values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../../dominio/values/experienciaLaboral/RangoFechaExperienciaLaboral'
import { AgregarExperienciaLaboralEmpleadoComandoDTO } from '../dto/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { EditarExperienciaLaboralEmpleadoComandoDTO } from '../dto/comandos/EditarExperienciaLaboralEmpleado.comando'
import { EliminarExperienciaLaboralEmpleadoComandoDTO } from '../dto/comandos/EliminarExperienciaLaboralEmpleado.comando'
import { ConsultarExperienciasLaboralesEmpleadoRespuestaDTO } from '../dto/queries/ConsultarExperienciasLaboralesEmpleado.query'
import { ExperienciaLaboralPersitenciaDTO } from '../puertos/IRepositorioExperienciasLaborales'

export abstract class ExperienciaLaboralMapeador {
  public static convertirPersistenciaEnDominio(
    datos: ExperienciaLaboralPersitenciaDTO[],
  ): DatosRestaurarExperienciaLaboral[] {
    const experiencias: DatosRestaurarExperienciaLaboral[] = datos.map(
      (experiencia) => {
        return {
          identificador: IdentificadorExperienciaLaboral.crear(experiencia.id),
          cargo: CargoExperienciaLaboral.crear(experiencia.cargo),
          nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(
            experiencia.nombreEmpresa,
          ),
          rangoFecha: RangoFechaExperienciaLaboral.crear(
            experiencia.fechaInicio,
            experiencia.fechaFin,
          ),
        }
      },
    )

    return experiencias
  }

  public static convertirComandoEnDatosAgregar(
    id: string,
    comando: AgregarExperienciaLaboralEmpleadoComandoDTO,
  ): DatosAgregarExperienciaLaboral {
    return {
      identificador: IdentificadorExperienciaLaboral.crear(id),
      cargo: CargoExperienciaLaboral.crear(comando.cargo),
      nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(
        comando.nombreEmpresa,
      ),
      rangoFecha: RangoFechaExperienciaLaboral.crear(
        comando.fechaInicio,
        comando.fechaFin,
      ),
    }
  }

  public static convertirComandoEnDatosEditar(
    comando: EditarExperienciaLaboralEmpleadoComandoDTO,
  ): DatosEditarExperienciaLaboral {
    return {
      identificador: IdentificadorExperienciaLaboral.crear(comando.id),
      cargo: CargoExperienciaLaboral.crear(comando.cargo),
      nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(
        comando.nombreEmpresa,
      ),
      rangoFecha: RangoFechaExperienciaLaboral.crear(
        comando.fechaInicio,
        comando.fechaFin,
      ),
    }
  }

  public static convertirDominioEnPersistencia(
    experiencia: ExperienciaLaboral,
    idEmpleado: IdentificadorEmpleado,
  ): ExperienciaLaboralPersitenciaDTO {
    return {
      id: experiencia.obtenerIdentificador().obtenerId(),
      cargo: experiencia.obtenerCargo().obtenerCargo(),
      nombreEmpresa: experiencia.obtenerNombreEmpresa().obtenerNombre(),
      fechaInicio: experiencia.obtenerRangoFecha().obtenerFechaInicio(),
      fechaFin: experiencia.obtenerRangoFecha().obtenerFechaFin(),
      idEmpleado: idEmpleado.obtenerId(),
    }
  }

  public static convertirComandoEnDatosEliminar(
    comando: EliminarExperienciaLaboralEmpleadoComandoDTO,
  ): DatosEliminarExperienciaLaboralEmpleado {
    return {
      identificador: IdentificadorExperienciaLaboral.crear(comando.id),
    }
  }

  public static convertirDominioEnRespuesta(
    experiencias: ExperienciaLaboral[],
  ): ConsultarExperienciasLaboralesEmpleadoRespuestaDTO[] {
    return experiencias.map((experiencia) => {
      return {
        id: experiencia.obtenerIdentificador().obtenerId(),
        cargo: experiencia.obtenerCargo().obtenerCargo(),
        nombreEmpresa: experiencia.obtenerNombreEmpresa().obtenerNombre(),
        fechaInicio: experiencia.obtenerRangoFecha().obtenerFechaInicio(),
        fechaFin: experiencia.obtenerRangoFecha().obtenerFechaFin(),
      }
    })
  }
}
