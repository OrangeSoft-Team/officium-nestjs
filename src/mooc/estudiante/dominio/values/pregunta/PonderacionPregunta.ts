import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { PonderacionPreguntaVacio, LongitudInvalidaPonderacionPregunta } from '../../excepciones/pregunta/PonderacionPregunta.excepciones'


export class PonderacionPregunta implements IValueObject {
    private constructor(private readonly ponderacion: number) {}
  
    public obtenerPonderacion() {
      return this.ponderacion
    }
  
    public esIgual(ponderacion: PonderacionPregunta): boolean {
      return this.ponderacion == ponderacion.obtenerPonderacion()
    }
  
    public static crear(ponderacion: number): PonderacionPregunta {
      // No debe ser vacio
      if (ponderacion == null || ponderacion == undefined)
        throw new PonderacionPreguntaVacio(
          'La ponderacion de la pregunta no puede estar vacio.',
        )
      if (ponderacion <= 0)
        throw new LongitudInvalidaPonderacionPregunta(
            'La poderacion debe ser mayor a 0'
        )

      if (ponderacion > 100)
      throw new LongitudInvalidaPonderacionPregunta(
        'La poderacion debe ser menor o igual a 100'
    )

      // Si no hay errores
      return new PonderacionPregunta(ponderacion)
    }
  }