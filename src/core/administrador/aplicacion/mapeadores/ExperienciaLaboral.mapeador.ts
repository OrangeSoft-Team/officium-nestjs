import { ExperienciaLaboral } from '../../dominio/entidades/ExperienciaLaboral'
import { DatosRestaurarExperienciaLaboral } from '../../dominio/servicios/RestaurarEmpleado'
import { CargoExperienciaLaboral } from '../../dominio/values/experienciaLaboral/CargoExperienciaLaboral'
import { IdentificadorExperienciaLaboral } from '../../dominio/values/experienciaLaboral/IdentificadorExperienciaLaboral'
import { NombreEmpresaExperienciaLaboral } from '../../dominio/values/experienciaLaboral/NombreEmpresaExperienciaLaboral'
import { RangoFechaExperienciaLaboral } from '../../dominio/values/experienciaLaboral/RangoFechaExperienciaLaboral'
import { ExperienciaLaboralPerfilEmpleadoRespuestaDTO } from '../dto/queries/VerPerfilEmpleado.query'
import { ExperienciaLaboralPersistenciaDTO } from '../puertos/IRepositorioExperienciasLaborales'

export abstract class ExperienciaLaboralMapeador {
  public static convertirPersistenciaEnDominio(
    datos: ExperienciaLaboralPersistenciaDTO,
  ): DatosRestaurarExperienciaLaboral {
    return {
      identificador: IdentificadorExperienciaLaboral.crear(datos.id),
      cargo: CargoExperienciaLaboral.crear(datos.cargo),
      nombreEmpresa: NombreEmpresaExperienciaLaboral.crear(datos.nombreEmpresa),
      rangoFecha: RangoFechaExperienciaLaboral.crear(
        datos.fechaInicio,
        datos.fechaFin,
      ),
    }
  }

  public static convertirDominioEnRespuesta(
    experienciaLaboral: ExperienciaLaboral,
  ): ExperienciaLaboralPerfilEmpleadoRespuestaDTO {
    return {
      id: experienciaLaboral.obtenerIdentificador(),
      cargo: experienciaLaboral.obtenerCargo(),
      nombreEmpresa: experienciaLaboral.obtenerNombreEmpresa(),
      fechaInicio: experienciaLaboral.obtenerFechaInicio(),
      fechaFin: experienciaLaboral.obtenerFechaFin(),
    }
  }
}
