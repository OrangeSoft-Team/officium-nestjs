import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empresa } from '../../dominio/entidades/Empresa'
import { CiudadNoExiste } from '../../dominio/excepciones/ciudad/Ciudad.excepciones'
import { EmpresaNoExiste } from '../../dominio/excepciones/empresa/Empresa.excepciones'
import { EstadoNoExiste } from '../../dominio/excepciones/estado/Estado.excepciones'
import { PaisNoExiste } from '../../dominio/excepciones/pais/Pais.excepciones'
import {
  DatosCrearHabilidadEmpresa,
  EditarPerfilEmpresa,
} from '../../dominio/servicios/EditarPerfilEmpresa'
import { RestaurarEmpresa } from '../../dominio/servicios/RestaurarEmpresa'
import { EditarPerfilEmpresaComandoDTO } from '../dto/comandos/EditarPerfilEmpresa.comando'
import { DireccionMapeador } from '../mapeadores/Direccion.mapeador'
import { EmpresaMapeador } from '../mapeadores/Empresa.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioDirecciones } from '../puertos/IRepositorioDirecciones'
import { IRepositorioEmpresas } from '../puertos/IRepositorioEmpresas'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioEditarPerfilEmpresa implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpresas: IRepositorioEmpresas,
    private readonly repositorioDirecciones: IRepositorioDirecciones,
    private readonly repositorioHabilidades: IRepositorioHabilidades,
    private readonly servicioIdentificadores: IServicioIdentificador,
    private readonly busEventos: IBusEventos,
  ) {}

  private async verificarUbicacion(
    idPais: string,
    idEstado: string,
    idCiudad: string,
  ) {
    const paisExiste = await this.repositorioDirecciones.verificarPais(idPais)
    if (!paisExiste)
      throw new PaisNoExiste('El país especificado no se encuentra registrado.')

    const estadoExiste = await this.repositorioDirecciones.verificarEstado(
      idPais,
      idEstado,
    )
    if (!estadoExiste)
      throw new EstadoNoExiste(
        'El estado especificado no se encuentra registrado.',
      )

    const ciudadExiste = await this.repositorioDirecciones.verificarCiudad(
      idEstado,
      idCiudad,
    )
    if (!ciudadExiste)
      throw new CiudadNoExiste(
        'La ciudad especificada no se encuentra registrada.',
      )
  }

  private async restaurarEmpresa(id: string): Promise<Empresa> {
    const datosEmpresa = await this.repositorioEmpresas.obtener(id)

    if (!datosEmpresa)
      throw new EmpresaNoExiste('La empresa no se encuentra registrada.')

    const datos = EmpresaMapeador.convertirPersistenciaEnDominio(
      datosEmpresa,
      null,
      null,
    )

    return RestaurarEmpresa.restaurar(datos)
  }

  private async obtenerHabilidades(
    identificadores: string[],
  ): Promise<DatosCrearHabilidadEmpresa[]> {
    const datosHabilidades =
      await this.repositorioHabilidades.obtenerPorIdentificadores(
        identificadores,
      )

    const habilidades =
      HabilidadMapeador.convertirPersistenciaEnDominio(datosHabilidades)

    return habilidades
  }

  public async ejecutar(
    comando: EditarPerfilEmpresaComandoDTO,
  ): Promise<Resultado<void | IExcepcionAplicacion>> {
    try {
      // Recuperamos al agregado Empresa
      const empresa = await this.restaurarEmpresa(comando.idEmpresa)

      // Verificamos la ciudad, estado y pais especificado
      await this.verificarUbicacion(
        comando.idPais,
        comando.idEstado,
        comando.idCiudad,
      )

      // Mappeamos los datos de direccion
      const datosDireccion = DireccionMapeador.convertirComandoCrearDireccion({
        ...comando,
        id: this.servicioIdentificadores.generarIdentificador(),
      })

      // Obtenemos las habilidades especificadas
      const datosHabilidades = await this.obtenerHabilidades(
        comando.idHabilidades,
      )

      // Mappeamos comando a servicio de dominio
      const datosPerfil = EmpresaMapeador.convertirComandoEnEditarPerfil(
        comando,
        datosDireccion,
        datosHabilidades,
      )

      // Ejecutamos servicio de dominio
      EditarPerfilEmpresa.editar(datosPerfil, empresa)

      // Persistimos los cambios
      await this.repositorioDirecciones.crear(
        DireccionMapeador.convertirDominioEnPersistencia(
          empresa.obtenerDireccion(),
        ),
      )
      await this.repositorioHabilidades.guardarParaEmpresa(
        HabilidadMapeador.convertirDominioEnPersistencia(
          empresa.obtenerHabilidades(),
        ),
        empresa.obtenerIdentificador(),
      )
      await this.repositorioEmpresas.actualizarDatos(
        EmpresaMapeador.convertirDominioEnPersistencia(empresa),
      )

      // Publicamos eventos
      this.busEventos.publicar(empresa.obtenerEventos())

      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
