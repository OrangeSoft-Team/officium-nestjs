import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { ValorOpcionVacio, LongitudInvalidaValorOpcion } from '../../excepciones/opcion/ValorOpcion.excepciones'


export class ValorOpcion implements IValueObject {
    private constructor(private readonly valor: string) {}
  
    public obtenerValor() {
      return this.valor
    }
  
    public esIgual(valor: ValorOpcion): boolean {
      return this.valor == valor.obtenerValor()
    }
  
    public static crear(valor: string): ValorOpcion {
      // No debe ser vacio
      if (valor == null || valor == undefined || valor == '')
        throw new ValorOpcionVacio(
          'El valor de la opcion no puede estar vacio.',
        )
      if (valor.length < 4)
        throw new LongitudInvalidaValorOpcion(
            'La opcion no puede ser menor a 4 caracteres'
        )

      if (valor.length > 80)
      throw new LongitudInvalidaValorOpcion(
        'La opcion no puede ser mayor a 80 caracteres'
    )

      // Si no hay errores
      return new ValorOpcion(valor)
    }
  }