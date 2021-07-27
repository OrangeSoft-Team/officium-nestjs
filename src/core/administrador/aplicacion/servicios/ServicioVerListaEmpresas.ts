import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { RestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import { VerListaEmpresasRespuestaDTO } from '../dto/queries/VerListaEmpresas.query'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioVerListaEmpresas implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
  ) {}

  private async restaurarEmpresas(): Promise<Empresa[]> {
    const datosEmpresas = await this.repositorioEmpresas.obtenerTodas()
    const datosRestaurar = datosEmpresas.map((datos) =>
      EmpresaMapeador.convertirPersistenciaEnDominio(datos),
    )
    return datosRestaurar.map((datos) => RestaurarEmpresa.restaurar(datos))
  }

  public async ejecutar(): Promise<
    Resultado<VerListaEmpresasRespuestaDTO[] | IExcepcionAplicacion>
  > {
    try {
      // Restauramos a la empresas de persistencia
      const empresas = await this.restaurarEmpresas()

      // Mapeamos las respuestas de los datos basicos de cada una
      const respuesta =
        EmpresaMapeador.convertirDominioEnListadoRespuesta(empresas)

      // Enviamos la respuesta
      return Resultado.ok<VerListaEmpresasRespuestaDTO[]>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
