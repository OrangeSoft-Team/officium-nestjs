import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { IdentificadorPreguntaVacio } from '../../excepciones/pregunta/IdentificadorPregunta.excepciones'

export class IdentificadorPregunta implements IValueObject {
    private constructor(private readonly id: string) {}
  
    public obtenerId() {
      return this.id
    }
  
    public esIgual(identificador: IdentificadorPregunta): boolean {
      return this.id == identificador.obtenerId()
    }
  
    public static crear(id: string): IdentificadorPregunta {
      // No debe ser vacio
      if (id == null || id == undefined || id == '')
        throw new IdentificadorPreguntaVacio(
          'El identificador de la pregunta no puede estar vacio.',
        )
      // Si no hay errores
      return new IdentificadorPregunta(id)
    }
  }