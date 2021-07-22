import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { EliminarExperienciaLaboralEmpleado } from '../../dominio/servicios/EliminarExperienciaLaboralEmpleado'
import {
  DatosRestaurarEmpleado,
  RestaurarEmpleado,
} from '../../dominio/servicios/RestaurarEmpleado'
import { EliminarExperienciaLaboralEmpleadoComandoDTO } from '../dto/comandos/EliminarExperienciaLaboralEmpleado.comando'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { ExperienciaLaboralMapeador } from '../mapeadores/ExperienciaLaboral.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioExperienciasLaborales } from '../puertos/IRepositorioExperienciasLaborales'

export class ServicioEliminarExperienciaLaboralEmpleado
  implements IServicioAplicacion
{
  public constructor(
    private readonly repositorioExperienciasLaborales: IRepositorioExperienciasLaborales,
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly busEventos: IBusEventos,
  ) {}

  public async ejecutar(
    comando: EliminarExperienciaLaboralEmpleadoComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      // Obtenemos los datos del empleado de persistencia
      const datosEmpleado = await this.repositorioEmpleados.obtener(
        comando.idEmpleado,
      )
      if (!datosEmpleado)
        throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

      // Obtenemos los datos de las experiencias laborales actuales
      const datosExperiencias =
        await this.repositorioExperienciasLaborales.obtenerPorIdEmpleado(
          comando.idEmpleado,
        )

      // Mappeamos a dominio
      const datosRestaurar: DatosRestaurarEmpleado = {
        ...EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado),
        direccion: null,
        experienciasLaborales:
          ExperienciaLaboralMapeador.convertirPersistenciaEnDominio(
            datosExperiencias,
          ),
      }

      // Mappeamos el comando a dominio
      const datosExperiencia =
        ExperienciaLaboralMapeador.convertirComandoEnDatosEliminar(comando)

      // Obtenemos el empleado
      const empleado = RestaurarEmpleado.restaurar(datosRestaurar)

      // Agregamos la experiencia laboral al empleado
      EliminarExperienciaLaboralEmpleado.eliminar(datosExperiencia, empleado)

      // Persistimos el cambio
      await this.repositorioExperienciasLaborales.eliminar(
        datosExperiencia.identificador.obtenerId(),
        empleado.obtenerIdentificador().obtenerId(),
      )

      // Publicamos el evento de dominio
      await this.busEventos.publicar(empleado.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
