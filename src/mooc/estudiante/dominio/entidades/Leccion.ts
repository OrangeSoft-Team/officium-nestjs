import { Entidad } from '../../../../comun/dominio/Entidad'
import { ContenidoLeccion } from '../values/leccion/ContenidoLeccion'
import { DescripcionLeccion } from '../values/leccion/DescripcionLeccion'
import { IdentificadorLeccion } from '../values/leccion/IdentificadorLeccion'
import { TituloLeccion } from '../values/leccion/TituloLeccion'




export interface DatosLeccion {
  identificador: IdentificadorLeccion
  titulo: TituloLeccion
  descripcion: DescripcionLeccion
  contenido: ContenidoLeccion
}

export class Leccion extends Entidad {
  private constructor(
    private readonly identificador: IdentificadorLeccion,
    private titulo: TituloLeccion,
    private descripcion: DescripcionLeccion,
    private contenido: ContenidoLeccion,
  ) {
    super()
  }

  public obtenerIdentificador() {
    return this.identificador
  }

  public esIgual(leccion: Leccion): boolean {
    return this.identificador.esIgual(leccion.obtenerIdentificador())
  }

  public obtenerTitulo() {
    return this.titulo
  }

  public obtenerDescripcion() {
    return this.descripcion
  }

  public obtenerContenido() {
    return this.contenido
  }


  public static crear(datos: DatosLeccion): Leccion {
    return new Leccion(
      datos.identificador,
      datos.titulo,
      datos.descripcion,
      datos.contenido,
    )
  }

  public static restaurar(datos: DatosLeccion): Leccion {
    return new Leccion(
        datos.identificador,
        datos.titulo,
        datos.descripcion,
        datos.contenido,
    )
  }
}