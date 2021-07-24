import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { RestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import { ActualizarHabilidadesEmpleadoComandoDTO } from '../dto/comandos/ActualizarHabilidadesEmpleado.comando'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioActualizarHabilidadesEmpleado
  implements IServicioAplicacion
{
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly repositorioHabilidades: IRepositorioHabilidades,
    private readonly busEventos: IBusEventos,
  ) {}

  public async ejecutar(
    comando: ActualizarHabilidadesEmpleadoComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      // Obtenemos los datos del empleado de persistencia
      const datosEmpleado = await this.repositorioEmpleados.obtener(
        comando.idEmpleado,
      )
      if (!datosEmpleado)
        throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

      // Obtenemos las habilidades del empleado de persistencia
      const datosHabilidades =
        (await this.repositorioHabilidades.obtenerPorIdEmpleado(
          comando.idEmpleado,
        )) ?? []

      // Mappeamos a dominio
      const datosRestaurarEmpleado =
        EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado)

      datosRestaurarEmpleado.identificadoresHabilidades =
        HabilidadMapeador.convertirPersistenciaEnDominio(datosHabilidades)

      // Obtenemos el empleado
      const empleado = RestaurarEmpleado.restaurar(datosRestaurarEmpleado)

      // Actualizamos las habilidades del empleado
      empleado.actualizarHabilidades(
        HabilidadMapeador.convertirComandoEnDatosActualizar(comando),
      )

      // Obtenemos las habilidades del empleado
      const habilidades = empleado.obtenerIdentificadoresHabilidades()

      // Persistimos los cambios
      await this.repositorioHabilidades.actualizarPorIdEmpleado(
        comando.idEmpleado,
        HabilidadMapeador.convertirDominioEnPersistencia(habilidades),
      )

      // Publicamos el evento de dominio
      await this.busEventos.publicar(empleado.obtenerEventos())

      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
