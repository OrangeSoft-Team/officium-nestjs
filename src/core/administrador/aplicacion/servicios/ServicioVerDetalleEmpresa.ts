import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { EmpresaNoExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import { RestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import {
  VerDetalleEmpresaQueryDTO,
  VerDetalleEmpresaRespuestaDTO,
} from '../dto/queries/VerDetalleEmpresa.query'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioVerDetalleEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
  ) {}

  private async restaurarEmpresa(id: string): Promise<Empresa> {
    const datos = await this.repositorioEmpresas.obtenerPorId(id)
    if (!datos)
      throw new EmpresaNoExiste('La empresa no se encuentra registrada.')

    return RestaurarEmpresa.restaurar(
      EmpresaMapeador.convertirPersistenciaEnDominio(datos),
    )
  }

  public async ejecutar(
    query: VerDetalleEmpresaQueryDTO,
  ): Promise<Resultado<VerDetalleEmpresaRespuestaDTO | IExcepcionAplicacion>> {
    try {
      // Restauramos a la empresa
      const empresa = await this.restaurarEmpresa(query.id)

      // Mappeamos la respuesta
      const respuesta =
        EmpresaMapeador.convertirDominioEnDetalleRespuesta(empresa)

      // Retornamos la respuesta
      return Resultado.ok<VerDetalleEmpresaRespuestaDTO>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
