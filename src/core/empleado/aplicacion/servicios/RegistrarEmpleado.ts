import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { RegistrarEmpleadoComandoDTO } from '../dto/RegistrarEmpleado.comando'
import { CiudadNoExiste } from '../excepciones/CiudadNoExiste'
import { EmpleadoYaExiste } from '../excepciones/EmpleadoYaExiste'
import { EstadoNoExiste } from '../excepciones/EstadoNoExiste'
import { PaisNoExiste } from '../excepciones/PaisNoExiste'
import { DireccionMapeador } from '../mapeadores/Direccion.mapeador'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { IRepositorioCiudades } from '../puertos/IRepositorioCiudades'
import { IRepositorioDirecciones } from '../puertos/IRepositorioDirecciones'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioEstados } from '../puertos/IRepositorioEstados'
import { IRepositorioPaises } from '../puertos/IRepositorioPaises'

export class RegistrarEmpleado implements IServicioAplicacion {
  public constructor(
    private readonly repositorioPaises: IRepositorioPaises,
    private readonly repositorioEstados: IRepositorioEstados,
    private readonly repositorioCiudades: IRepositorioCiudades,
    private readonly repositorioDirecciones: IRepositorioDirecciones,
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly servicioIdentificador: IServicioIdentificador,
    private readonly busEventos: IBusEventos,
  ) {}

  private async verificarPais(id: string): Promise<void> {
    const paisExiste = await this.repositorioPaises.existe({ id })
    if (!paisExiste)
      throw new PaisNoExiste('El país especificado no se encuentra registrado.')
  }

  private async verificarEstado(
    idPais: string,
    idEstado: string,
  ): Promise<void> {
    const estadoExiste = await this.repositorioEstados.existe({
      idPais,
      idEstado,
    })
    if (!estadoExiste)
      throw new EstadoNoExiste(
        'El estado especificado no se encuentra registrado.',
      )
  }

  private async verificarCiudad(
    idEstado: string,
    idCiudad: string,
  ): Promise<void> {
    const ciudadExiste = await this.repositorioCiudades.existe({
      idEstado,
      idCiudad,
    })
    if (!ciudadExiste)
      throw new CiudadNoExiste(
        'La ciudad especificada no se encuentra registrada.',
      )
  }

  private async verificarExisteEmpleado(
    correoElectronico: string,
  ): Promise<void> {
    const empleadoExiste = await this.repositorioEmpleados.existe({
      correoElectronico,
    })
    if (empleadoExiste)
      throw new EmpleadoYaExiste(
        'El empleado con el correo electrónico especificado ya se encuentra registrado.',
      )
  }

  public async ejecutar(
    comando: RegistrarEmpleadoComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      const datosDir = comando.direccion

      // Verificamos que el pais existe
      await this.verificarPais(datosDir.idPais)

      // Verificamos que el estado existe
      await this.verificarEstado(datosDir.idPais, datosDir.idEstado)

      // Verificamos la ciudad existe
      await this.verificarCiudad(datosDir.idEstado, datosDir.idCiudad)

      // Verificamos que el empleado no exista ya
      await this.verificarExisteEmpleado(comando.correoElectronico)

      // Generamos un identificador para la direccion
      const idDireccion = this.servicioIdentificador.generarIdentificador()

      // Creamos la entidad de dominio Direccion
      const direccion = DireccionMapeador.transformarSolicitudEnEntidad(
        datosDir,
        idDireccion,
      )

      // Generamos un identificador para el empleado
      const idEmpleado = this.servicioIdentificador.generarIdentificador()

      // Creamos la entidad de dominio Empleado
      const empleado = EmpleadoMapeador.transformarSolicitudEnEntidad(
        comando,
        idEmpleado,
        direccion,
      )

      // Persistimos la direccion
      await this.repositorioDirecciones.crear(
        DireccionMapeador.transformarEntidadEnPersistencia(direccion),
      )

      // Persistimos el empleado
      await this.repositorioEmpleados.crear(
        EmpleadoMapeador.transformarEntidadEnPersistencia(
          empleado,
          comando.token,
        ),
      )

      // Publicamos Evento: EmpleadoRegistrado
      const eventos = empleado.obtenerEventos()
      //await this.busEventos.publicar(eventos)

      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
