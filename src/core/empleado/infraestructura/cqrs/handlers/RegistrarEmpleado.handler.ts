import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ServicioIdentificador } from '../../../../../comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioRegistrarEmpleado } from '../../../aplicacion/servicios/ServicioRegistrarEmpleado'
import { RepositorioCiudades } from '../../adaptadores/RepositorioCiudades'
import { RepositorioDirecciones } from '../../adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../adaptadores/RepositorioEmpleados'
import { RepositorioEstados } from '../../adaptadores/RepositorioEstados'
import { RepositorioPaises } from '../../adaptadores/RepositorioPaises'
import { EmpleadoApiMapeador } from '../../mapeadores/Empleado.api.mapeador'
import { ComandoRegistrarEmpleado } from '../comandos/RegistrarEmpleado.comando'

@CommandHandler(ComandoRegistrarEmpleado)
export class HandlerRegistrarEmpleado
  implements ICommandHandler<ComandoRegistrarEmpleado>
{
  private readonly repositorioPaises: RepositorioPaises
  private readonly repositorioEstados: RepositorioEstados
  private readonly repositorioCiudades: RepositorioCiudades
  private readonly repositorioDirecciones: RepositorioDirecciones
  private readonly repositorioEmpleados: RepositorioEmpleados
  private readonly servicioIdentificador: ServicioIdentificador

  private readonly servicioRegistrarEmpleado: ServicioRegistrarEmpleado

  public constructor() {
    this.repositorioPaises = new RepositorioPaises()
    this.repositorioEstados = new RepositorioEstados()
    this.repositorioCiudades = new RepositorioCiudades()
    this.repositorioDirecciones = new RepositorioDirecciones()
    this.repositorioEmpleados = new RepositorioEmpleados()
    this.servicioIdentificador = new ServicioIdentificador()

    this.servicioRegistrarEmpleado = new ServicioRegistrarEmpleado(
      this.repositorioPaises,
      this.repositorioEstados,
      this.repositorioCiudades,
      this.repositorioDirecciones,
      this.repositorioEmpleados,
      this.servicioIdentificador,
      null,
    )
  }

  public async execute(comando: ComandoRegistrarEmpleado) {
    return this.servicioRegistrarEmpleado.ejecutar(
      EmpleadoApiMapeador.transformarComandoRegistrarEmpleado(comando),
    )
  }
}
