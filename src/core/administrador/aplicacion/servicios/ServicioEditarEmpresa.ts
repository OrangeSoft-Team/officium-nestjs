import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { EmpresaNoExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import { EditarEmpresa } from '../../dominio/servicios/EditarEmpresa'
import { RestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import { EditarEmpresaComandoDTO } from '../dto/comandos/EditarEmpresa.comando'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioEditarEmpresa implements IServicioAplicacion {
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
    comando: EditarEmpresaComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Restauramos a la empresa
      const empresa = await this.restaurarEmpresa(comando.id)

      // Mappeamos el comando a dominio
      const datosEditar = EmpresaMapeador.convertirComandoEditarEmpresa(comando)

      // Ejecutamos el servicio de dominio
      EditarEmpresa.editar(datosEditar, empresa)

      // Persistimos el cambio
      await this.repositorioEmpresas.editar(
        EmpresaMapeador.convertirDominioEnPersistencia(empresa),
      )

      // Publicamos eventos
      this.busEventos.publicar(empresa.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>()
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
