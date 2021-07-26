import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { EmpresaNoExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import {
  DatosRestaurarDireccion,
  DatosRestaurarHabilidad,
  RestaurarEmpresa,
} from '../../dominio/servicios/RestaurarEmpresa'
import {
  ObtenerPerfilEmpresaQueryDTO,
  ObtenerPerfilEmpresaRespuestaDTO,
} from '../dto/queries/ObtenerPerfilEmpresa.query'
import { DireccionMapeador } from '../mapeadores/Direccion.mapeador'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioDirecciones } from '../puertos/IRepositorioDirecciones'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioObtenerPerfilEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
    private readonly repositorioDirecciones: IRepositorioDirecciones,
    private readonly repositorioHabilidades: IRepositorioHabilidades,
  ) {}

  private async obtenerDatosDireccion(
    id: string,
  ): Promise<DatosRestaurarDireccion> {
    const datos = await this.repositorioDirecciones.obtenerPorId(id)
    if (datos) return DireccionMapeador.convertirPersistenciaEnDominio(datos)
  }

  private async obtenerDatosHabilidades(
    id: string,
  ): Promise<DatosRestaurarHabilidad[]> {
    const datos = await this.repositorioHabilidades.obtenerPorIdEmpresa(id)
    return HabilidadMapeador.convertirPersistenciaEnDominio(datos)
  }

  private async restaurarEmpresa(id: string): Promise<Empresa> {
    const datosEmpresa = await this.repositorioEmpresas.obtener(id)

    if (!datosEmpresa)
      throw new EmpresaNoExiste('La empresa no se encuentra registrada.')

    const datosHabilidades = await this.obtenerDatosHabilidades(id)
    const datosDireccion = await this.obtenerDatosDireccion(
      datosEmpresa.idDireccion,
    )

    const datos = EmpresaMapeador.convertirPersistenciaEnDominio(
      datosEmpresa,
      datosDireccion,
      datosHabilidades,
    )

    return RestaurarEmpresa.restaurar(datos)
  }

  public async ejecutar(
    query: ObtenerPerfilEmpresaQueryDTO,
  ): Promise<
    Resultado<ObtenerPerfilEmpresaRespuestaDTO | IExcepcionAplicacion>
  > {
    try {
      // Recuperamos al agregado Empresa
      const empresa = await this.restaurarEmpresa(query.idEmpresa)

      // Mapeamos el perfil de la empresa para la respuesta
      const perfil = EmpresaMapeador.convertirDominioEnRespuesta(empresa)

      return Resultado.ok<ObtenerPerfilEmpresaRespuestaDTO>(perfil)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
