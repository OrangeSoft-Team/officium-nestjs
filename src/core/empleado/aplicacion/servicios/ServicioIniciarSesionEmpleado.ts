import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { AutentificacionEmpleadoInvalida } from '../../dominio/excepciones/empleado/AutentificacionEmpleadoInvalida'
import {
  IniciarSesionEmpleadoQueryDTO,
  IniciarSesionEmpleadoRespuestaDTO,
} from '../dto/IniciarSesionEmpleado.query'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'

export class ServicioIniciarSesionEmpleado implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
  ) {}

  public async ejecutar(
    query: IniciarSesionEmpleadoQueryDTO,
  ): Promise<Resultado<any>> {
    try {
      // Verificamos la información suministrada
      const sesion = await this.repositorioEmpleados.autentificar(query)

      // Si la sesion es invalida arrojamos un error
      if (!sesion.valido) {
        throw new AutentificacionEmpleadoInvalida(
          'Los datos suministrados son invalidos.',
        )
      }
      return Resultado.ok<IniciarSesionEmpleadoRespuestaDTO>(sesion)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
