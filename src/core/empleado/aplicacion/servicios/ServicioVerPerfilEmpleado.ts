import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empleado } from '../../dominio/entidades/Empleado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { RestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import {
  VerPerfilEmpleadoQueryDTO,
  VerPerfilEmpleadoRespuestaDTO,
} from '../dto/queries/VerPerfilEmpleado.query'
import { DireccionMapeador } from '../mapeadores/Direccion.mapeador'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'

import { IRepositorioDirecciones } from '../puertos/IRepositorioDirecciones'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'

export class ServicioVerPerfilEmpleado implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly repositorioDirecciones: IRepositorioDirecciones,
  ) {}

  private async restaurarEmpleado(id: string): Promise<Empleado> {
    const datosEmpleado = await this.repositorioEmpleados.obtener(id)
    if (!datosEmpleado)
      throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

    const datosDireccion = await this.repositorioDirecciones.obtener(
      datosEmpleado.idDireccion,
    )

    return RestaurarEmpleado.restaurar({
      ...EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado),
      direccion:
        DireccionMapeador.convertirPersistenciaEnDominio(datosDireccion),
    })
  }

  public async ejecutar(
    query: VerPerfilEmpleadoQueryDTO,
  ): Promise<Resultado<VerPerfilEmpleadoRespuestaDTO | IExcepcionAplicacion>> {
    try {
      // Restauramos al empleado
      const empleado = await this.restaurarEmpleado(query.id)

      // Buscamos el pais y estado
      const paisEstado = await this.repositorioDirecciones.obtener(
        empleado.obtenerDireccion().obtenerIdentificador().obtenerId(),
      )

      // Mappeamos dominio a respuesta
      const respuesta = EmpleadoMapeador.convertirDominioEnRespuestaVerPerfil(
        empleado,
        paisEstado.idPais,
        paisEstado.idEstado,
      )

      // Retornamos ok
      return Resultado.ok<VerPerfilEmpleadoRespuestaDTO>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
