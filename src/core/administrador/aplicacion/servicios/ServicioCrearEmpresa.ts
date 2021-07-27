import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpresaYaExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import { CrearEmpresa } from '../../dominio/servicios/CrearEmpresa'
import { CrearEmpresaComandoDTO } from '../dto/comandos/CrearEmpresa.comando'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'

export class ServicioCrearEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
    private readonly servicioIdentificador: IServicioIdentificador,
    private readonly busEventos: IBusEventos,
  ) {}

  private async verificarExisteEmpresa(correo: string): Promise<void> {
    const existe = await this.repositorioEmpresas.existe(correo)
    if (existe)
      throw new EmpresaYaExiste('La empresa ya se encuentra registrada.')
  }

  public async ejecutar(
    comando: CrearEmpresaComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Verificamos que la empresa no exista actualmente
      await this.verificarExisteEmpresa(comando.correoElectronico)

      // Mappemaos el comando a dominio
      const datosEmpresa = EmpresaMapeador.convertirComandoCrearEmpresa(
        this.servicioIdentificador.generarIdentificador(),
        comando,
      )

      // Creamos a la empresa
      const empresa = CrearEmpresa.crear(datosEmpresa)

      // Persistimos la empresa
      await this.repositorioEmpresas.crear({
        ...EmpresaMapeador.convertirDominioEnPersistencia(empresa),
        token: comando.token,
      })

      // Publicamos eventos
      await this.busEventos.publicar(empresa.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>()
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
