import { Entidad } from '../../../../comun/dominio/Entidad'
import { IdentificadorEstado } from '../values/estado/IdentificadorEstado'
import { NombreEstado } from '../values/estado/NombreEstado'

export interface DatosEstado {
  identificador: IdentificadorEstado
  nombre: NombreEstado
}

export class Estado extends Entidad {
  public constructor(
    private readonly identificador: IdentificadorEstado,
    private nombre: NombreEstado,
  ) {
    super()
  }

  public esIgual(estado: Estado): boolean {
    return this.identificador.esIgual(estado.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerNombre() {
    return this.nombre.obtenerNombre()
  }

  public static restaurar(datos: DatosEstado): Estado {
    return new Estado(datos.identificador, datos.nombre)
  }
}
