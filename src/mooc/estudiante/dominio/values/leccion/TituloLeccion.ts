import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { TituloLeccionVacio, LongitudInvalidaTituloLeccion } from '../../excepciones/leccion/TituloLeccion.excepciones'


export class TituloLeccion implements IValueObject {
    private constructor(private readonly titulo: string) {}
  
    public obtenerTitulo() {
      return this.titulo
    }
  
    public esIgual(titulo: TituloLeccion): boolean {
      return this.titulo == titulo.obtenerTitulo()
    }
  
    public static crear(titulo: string): TituloLeccion {
      // No debe ser vacio
      if (titulo == null || titulo == undefined || titulo == '')
        throw new TituloLeccionVacio(
          'El titulo de la leccion no puede estar vacio.',
        )
      if (titulo.length < 4)
        throw new LongitudInvalidaTituloLeccion(
            'El titulo de la leccion no puede ser menor a 4 caracteres'
        )

      if (titulo.length > 80)
      throw new LongitudInvalidaTituloLeccion(
        'El titulo de la leccion no puede ser mayor a 80 caracteres'
    )

      // Si no hay errores
      return new TituloLeccion(titulo)
    }
  }