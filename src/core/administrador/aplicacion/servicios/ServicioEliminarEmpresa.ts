import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { EmpresaNoExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import { RestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import { EliminarEmpresaComandoDTO } from '../dto/comandos/EliminarEmpresa.comando'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioEliminarEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
    private readonly busEventos: IBusEventos,
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
    comando: EliminarEmpresaComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Restauramos a la empresa
      const empresa = await this.restaurarEmpresa(comando.id)

      // Solicitamos a la empresa que se elimine
      empresa.eliminar()

      // Persistimos el cambio
      await this.repositorioEmpresas.eliminar(empresa.obtenerIdentificador())

      // Publicamos eventos
      this.busEventos.publicar(empresa.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>()
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
