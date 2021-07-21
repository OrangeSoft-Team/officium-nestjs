import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { AutentificacionEmpresaInvalida } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import {
  IniciarSesionEmpresaQueryDTO,
  IniciarSesionEmpresaRespuestaDTO,
} from '../dto/IniciarSesionEmpresa.query'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioIniciarSesionEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
  ) {}

  public async ejecutar(
    query: IniciarSesionEmpresaQueryDTO,
  ): Promise<Resultado<any>> {
    try {
      // Verificamos la información suministrada
      const sesion = await this.repositorioEmpresas.autentificar(query)

      // Si la sesion es invalida arrojamos un error
      if (!sesion.valido) {
        throw new AutentificacionEmpresaInvalida(
          'Los datos suministrados son invalidos.',
        )
      }
      return Resultado.ok<IniciarSesionEmpresaRespuestaDTO>(sesion)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
