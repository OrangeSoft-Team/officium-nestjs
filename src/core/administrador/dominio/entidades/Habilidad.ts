import { Entidad } from '../../../../comun/dominio/Entidad'
import { CategoriaHabilidad } from '../values/habilidad/CategoriaHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'
import { NombreHabilidad } from '../values/habilidad/NombreHabilidad'

export interface DatosHabilidad {
  identificador: IdentificadorHabilidad
  nombre: NombreHabilidad
  categoria: CategoriaHabilidad
}

export class Habilidad extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorHabilidad,
    private nombre: NombreHabilidad,
    private categoria: CategoriaHabilidad,
  ) {
    super()
  }

  public esIgual(habilidad: Habilidad): boolean {
    return this.identificador.esIgual(habilidad.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerNombre() {
    return this.nombre.obtenerNombre()
  }

  public obtenerCategoria() {
    return this.categoria.obtenerCategoria()
  }

  public static restaurar(datos: DatosHabilidad): Habilidad {
    return new Habilidad(datos.identificador, datos.nombre, datos.categoria)
  }
}
