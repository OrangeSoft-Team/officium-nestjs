import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IntentosPermitidosCuestionarioVacio, LongitudInvalidaIntentosPermitidosCuestionario } from '../../excepciones/cuestionario/IntentosPermitidosCuestionario.excepciones'


export class IntentosPermitidosCuestionario implements IValueObject {
    private constructor(private readonly intentos: number) {}
  
    public obtenerIntentos() {
      return this.intentos
    }
  
    public esIgual(intentos: IntentosPermitidosCuestionario): boolean {
      return this.intentos == intentos.obtenerIntentos()
    }
  
    public static crear(intentos: number): IntentosPermitidosCuestionario {
      // No debe ser vacio
      if (intentos == null || intentos == undefined)
        throw new IntentosPermitidosCuestionarioVacio(
          'Los intentos del cuestionario no puede estar vacio.',
        )
      if (intentos <= 0)
        throw new LongitudInvalidaIntentosPermitidosCuestionario(
            'Los intentos debe ser mayor a 0'
        )

      if (intentos > 5)
      throw new LongitudInvalidaIntentosPermitidosCuestionario(
        'Los intentos debe ser menor o igual a 5'
    )

      // Si no hay errores
      return new IntentosPermitidosCuestionario(intentos)
    }
  }