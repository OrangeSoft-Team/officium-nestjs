import { Entidad } from '../../../../comun/dominio/Entidad'
import { CategoriaHabilidad } from '../../../../core/empleador/dominio/values/habilidad/CategoriaHabilidad'
import { NombreHabilidad } from '../../../../core/empleador/dominio/values/habilidad/NombreHabilidad'
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad'

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

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(habilidad: Habilidad): boolean {
    return this.identificador.esIgual(habilidad.obtenerIdentificador())
  }

  public obtenerNombre() {
    return this.nombre
  }

  public obtenerCategoria() {
    return this.categoria
  }

  public static crear(datos: DatosHabilidad): Habilidad {
    return new Habilidad(datos.identificador, datos.nombre, datos.categoria)
  }

  public static restaurar(datos: DatosHabilidad): Habilidad {
    return new Habilidad(datos.identificador, datos.nombre, datos.categoria)
  }
}
