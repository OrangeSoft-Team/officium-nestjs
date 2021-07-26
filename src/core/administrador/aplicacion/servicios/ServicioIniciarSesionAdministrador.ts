import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { AutentificacionAdministradorInvalida } from '../../dominio/excepciones/administrador/Administrador.excepciones'
import {
  IniciarSesionAdministradorQueryDTO,
  IniciarSesionAdministradorRespuestaDTO,
} from '../dto/queries/IniciarSesionAdministrador.query'
import { IRepositorioAdministradores } from '../puertos/IRepositorioAdministradores'

export class ServicioIniciarSesionAdministrador implements IServicioAplicacion {
  public constructor(
    private readonly repositorioAdministradores: IRepositorioAdministradores,
  ) {}

  public async ejecutar(
    query: IniciarSesionAdministradorQueryDTO,
  ): Promise<Resultado<any>> {
    try {
      // Verificamos la información suministrada
      const sesion = await this.repositorioAdministradores.autentificar(query)

      // Si la sesion es invalida arrojamos un error
      if (!sesion.valido) {
        throw new AutentificacionAdministradorInvalida(
          'Los datos suministrados son invalidos.',
        )
      }
      return Resultado.ok<IniciarSesionAdministradorRespuestaDTO>(sesion)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
