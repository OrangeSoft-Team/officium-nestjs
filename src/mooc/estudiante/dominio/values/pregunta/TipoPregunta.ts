import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { TipoPreguntaVacio, TipoPreguntaInvalida } from '../../excepciones/pregunta/TipoPregunta.excepciones'


type TIPOS_PREGUNTA = 
    'LISTA' 
    'SIMPLE'
    'MULTIPLE'


export class TipoPregunta implements IValueObject {
    private constructor(private readonly tipo: TIPOS_PREGUNTA) {}
  
    public obtenerTipo() {
      return this.tipo
    }
  
    public esIgual(tipo: TipoPregunta): boolean {
      return this.tipo == tipo.obtenerTipo()
    }
  
    public static crear(tipo: TIPOS_PREGUNTA): TipoPregunta {
      // No debe ser vacio
      if (tipo == null || tipo == undefined)
        throw new TipoPreguntaVacio(
          'El tipo de la pregunta no puede estar vacio.',
        )

      if (!['LISTA','SIMPLE','MULTIPLE'].includes[tipo])
        throw new TipoPreguntaInvalida(
            'La pregunta debe estar entre los tipos validos'
        )


      // Si no hay errores
      return new TipoPregunta(tipo)
    }
  }