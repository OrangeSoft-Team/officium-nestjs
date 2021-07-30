import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empleado } from '../../dominio/entidades/Empleado'
import { RestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import { ListarEmpleadosRespuestaDTO } from '../dto/queries/ListarEmpleados.query'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'

export class ServicioListarEmpleados implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
  ) {}

  private async restaurarEmpleados(): Promise<Empleado[]> {
    const datosEmpleados = await this.repositorioEmpleados.obtenerTodos()

    return datosEmpleados.map((datos) =>
      RestaurarEmpleado.restaurar(
        EmpleadoMapeador.convertirPersistenciaEnDominio(datos),
      ),
    )
  }

  public async ejecutar(): Promise<
    Resultado<ListarEmpleadosRespuestaDTO[] | IExcepcionAplicacion>
  > {
    try {
      // Restauramos a los distintos empleados
      const empleados = await this.restaurarEmpleados()

      // Mapeamos resultado del query
      const respuesta = empleados.map((empleado) =>
        EmpleadoMapeador.convertirDominioEnListadoRespuesta(empleado),
      )

      // Retornamos la lista
      return Resultado.ok<ListarEmpleadosRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
