import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { CorrectoOpcionVacio,} from '../../excepciones/opcion/CorrectoOpcion.excepciones'


export class CorrectoOpcion implements IValueObject {
    private constructor(private readonly valor: boolean) {}
  
    public obtenerCorrecto() {
      return this.valor
    }
  
    public esIgual(valor: CorrectoOpcion): boolean {
      return this.valor == valor.obtenerCorrecto()
    }
  
    public static crear(valor: boolean): CorrectoOpcion {
      // No debe ser vacio
      if (valor == null || valor == undefined)
        throw new CorrectoOpcionVacio(
          'El valor de la opcion no puede estar vacio.',
        )


      // Si no hay errores
      return new CorrectoOpcion(valor)
    }
  }