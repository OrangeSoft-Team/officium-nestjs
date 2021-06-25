import { ValueObject } from '../../../../comun/dominio/ValueObject'
import {
  EstadoEmpleadorVacio,
  EstadoEmpleadorInvalido,
} from '../../excepciones/empleador/EstadoEmpleador.excepciones'

type ESTADOS = 'activo' | 'inactivo'

export class EstadoEmpleador extends ValueObject {
  private constructor(private readonly estado: ESTADOS) {
    super()
  }

  public esIgual(estadoEmpleador: EstadoEmpleador): boolean {
    return this.estado == estadoEmpleador.estado
  }

  public static crear(estado: ESTADOS): EstadoEmpleador {
    if (estado == null || estado == undefined)
      throw new EstadoEmpleadorVacio(
        estado,
        'El estado del empleador no puede estar vacío.',
      )

    const estadoEmpleador = new EstadoEmpleador(estado)

    if (!['activo', 'inactivo'].includes(estado))
      throw new EstadoEmpleadorInvalido(
        estadoEmpleador,
        'El estado del empleador debe ser "activo" o "inactivo"',
      )

    return estadoEmpleador
  }
}
