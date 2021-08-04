import { IBusEventos } from '../../../../comun/aplicacion/IBusEventos'
import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { IServicioIdentificador } from '../../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { AgregarExperienciaLaboralEmpleado } from '../../dominio/servicios/AgregarExperienciaLaboralEmpleado'
import {
  DatosRestaurarEmpleado,
  RestaurarEmpleado,
} from '../../dominio/servicios/RestaurarEmpleado'
import { AgregarExperienciaLaboralEmpleadoComandoDTO } from '../dto/comandos/AgregarExperienciaLaboralEmpleado.comando'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { ExperienciaLaboralMapeador } from '../mapeadores/ExperienciaLaboral.mapeador'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioExperienciasLaborales } from '../puertos/IRepositorioExperienciasLaborales'

export class ServicioAgregarExperienciaLaboralEmpleado
  implements IServicioAplicacion
{
  public constructor(
    private readonly repositorioExperienciasLaborales: IRepositorioExperienciasLaborales,
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly servicioIdentificador: IServicioIdentificador,
    private readonly busEventos: IBusEventos,
  ) {}

  public async ejecutar(
    comando: AgregarExperienciaLaboralEmpleadoComandoDTO,
  ): Promise<Resultado<any>> {
    try {
      // Obtenemos los datos del empleado de persistencia
      const datosEmpleado = await this.repositorioEmpleados.obtener(
        comando.idEmpleado,
      )
      if (!datosEmpleado)
        throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

      // Obtenemos los datos de las experiencias laborales actuales
      const datosExperiencias =
        await this.repositorioExperienciasLaborales.obtenerPorIdEmpleado(
          comando.idEmpleado,
        )

      // Mappeamos a dominio
      const datosRestaurar: DatosRestaurarEmpleado = {
        ...EmpleadoMapeador.convertirPersistenciaEnDominio(datosEmpleado),
        direccion: null,
        experienciasLaborales:
          ExperienciaLaboralMapeador.convertirPersistenciaEnDominio(
            datosExperiencias,
          ),
      }

      // Obtenemos el empleado
      const empleado = RestaurarEmpleado.restaurar(datosRestaurar)

      // Mappeamos el comando a dominio
      const datosExperiencia =
        ExperienciaLaboralMapeador.convertirComandoEnDatosAgregar(
          this.servicioIdentificador.generarIdentificador(),
          comando,
        )

      // Agregamos la experiencia laboral al empleado
      AgregarExperienciaLaboralEmpleado.agregar(datosExperiencia, empleado)

      // Persistimos el cambio
      await this.repositorioExperienciasLaborales.crear(
        ExperienciaLaboralMapeador.convertirDominioEnPersistencia(
          empleado.obtenerExperienciaLaboral(datosExperiencia.identificador),
          empleado.obtenerIdentificador(),
        ),
      )

      // Publicamos el evento de dominio
      this.busEventos.publicar(empleado.obtenerEventos())

      // Retornamos ok
      return Resultado.ok<void>(null)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
