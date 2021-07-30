import { IExcepcionAplicacion } from '../../../../comun/aplicacion/IExcepcionAplicacion'
import { IServicioAplicacion } from '../../../../comun/aplicacion/IServicioAplicacion'
import { Resultado } from '../../../../comun/aplicacion/Resultado'
import { Empleado } from '../../dominio/entidades/Empleado'
import { DireccionNoExiste } from '../../dominio/excepciones/direccion/Direccion.excepciones'
import { EmpleadoNoExiste } from '../../dominio/excepciones/empleado/Empleado.excepciones'
import { RestaurarEmpleado } from '../../dominio/servicios/RestaurarEmpleado'
import {
  VerPerfilEmpleadoQueryDTO,
  VerPerfilEmpleadoRespuestaDTO,
} from '../dto/queries/VerPerfilEmpleado.query'
import { DireccionMapeador } from '../mapeadores/Direccion.mapeador'
import { EmpleadoMapeador } from '../mapeadores/Empleado.mapeador'
import { ExperienciaLaboralMapeador } from '../mapeadores/ExperienciaLaboral.mapeador'
import { HabilidadMapeador } from '../mapeadores/Habilidad.mapeador'
import { IRepositorioDirecciones } from '../puertos/IRepositorioDirecciones'
import { IRepositorioEmpleados } from '../puertos/IRepositorioEmpleados'
import { IRepositorioExperienciasLaborales } from '../puertos/IRepositorioExperienciasLaborales'
import { IRepositorioHabilidades } from '../puertos/IRepositorioHabilidades'

export class ServicioVerPerfilEmpleado implements IServicioAplicacion {
  public constructor(
    private readonly repositorioEmpleados: IRepositorioEmpleados,
    private readonly repositorioExperienciasLaborales: IRepositorioExperienciasLaborales,
    private readonly repositorioHabilidadeS: IRepositorioHabilidades,
    private readonly repositorioDirecciones: IRepositorioDirecciones,
  ) {}

  private async restaurarEmpleado(id: string): Promise<Empleado> {
    const datosEmpleado = await this.repositorioEmpleados.obtenerPorId(id)
    if (!datosEmpleado)
      throw new EmpleadoNoExiste('El empleado no se encuentra registrado.')

    const datosDireccion = await this.repositorioDirecciones.obtenerPorId(
      datosEmpleado.idDireccion,
    )
    if (!datosDireccion)
      throw new DireccionNoExiste(
        'La dirección del empleado no se encuentra registrada.',
      )

    const datosHabilidades =
      await this.repositorioHabilidadeS.obtenerPorIdEmpleado(id)

    const datosExperiencias =
      await this.repositorioExperienciasLaborales.obtenerPorIdEmpleado(id)

    return RestaurarEmpleado.restaurar({
      ...EmpleadoMapeador.convertirPersistenciaEnDominio({ ...datosEmpleado }),
      direccion: DireccionMapeador.convertirPersistenciaEnDominio({
        ...datosDireccion,
      }),
      habilidades: datosHabilidades?.map((habilidad) => {
        return HabilidadMapeador.convertirPersistenciaEnDominio(habilidad)
      }),
      experienciasLaborales: datosExperiencias?.map((experiencia) => {
        return ExperienciaLaboralMapeador.convertirPersistenciaEnDominio(
          experiencia,
        )
      }),
    })
  }

  public async ejecutar(
    query: VerPerfilEmpleadoQueryDTO,
  ): Promise<Resultado<VerPerfilEmpleadoRespuestaDTO | IExcepcionAplicacion>> {
    try {
      // Restauramos al empleado
      const empleado = await this.restaurarEmpleado(query.idEmpleado)

      // Mapeamos la respuesta a partir del agregado
      const respuesta = {
        ...EmpleadoMapeador.convertirDominioEnRespuestaDetallada(empleado),
        ...DireccionMapeador.convertirDominioEnRespuesta(
          empleado.obtenerDireccion(),
        ),
        habilidades: empleado
          .obtenerHabilidades()
          ?.map((habilidad) =>
            HabilidadMapeador.convertirDominioEnRespuesta(habilidad),
          ),
        experienciasLaborales: empleado
          .obtenerExperienciasLaborales()
          ?.map((experiencia) =>
            ExperienciaLaboralMapeador.convertirDominioEnRespuesta(experiencia),
          ),
      }
      // Retornamos el resultado
      return Resultado.ok<VerPerfilEmpleadoRespuestaDTO>(respuesta)
    } catch (error) {
      return Resultado.falla<IExcepcionAplicacion>(error)
    }
  }
}
