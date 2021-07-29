import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { DuracionEstimadaCursoVacio, DuracionEscalaCursoInvalida, LongitudInvalidaDuracionValorCurso } from '../../excepciones/curso/DuracionEstimadaCurso.excepciones'

type ESCALA_VALORES =
'HORA'
'DIA'
'SEMANA'
'MES'

export class DuracionEstimadaCurso implements IValueObject {
    private constructor(private readonly duracionEstimadaEscala: ESCALA_VALORES,
                        private readonly duracionEstimadaValor: number,
        ) {}
  
    public ObtenerDuracionEstimadaEscala() {
      return this.duracionEstimadaEscala
    }

      
    public ObtenerDuracionEstimadaValor() {
        return this.duracionEstimadaValor
      }
  
    public esIgual(duracion: DuracionEstimadaCurso): boolean {
      return (this.duracionEstimadaEscala == duracion.ObtenerDuracionEstimadaEscala() 
      && this.duracionEstimadaValor == duracion.ObtenerDuracionEstimadaValor()
      ) 
    }
  
    public static crear(duracionEstimadaEscala: ESCALA_VALORES, duracionEstimadaValor: number,): DuracionEstimadaCurso {
      // No debe ser vacio
      if (duracionEstimadaEscala == null || duracionEstimadaEscala == undefined)
        throw new DuracionEstimadaCursoVacio(
          'La escala de duracion del curso no puede estar vacio.',
        )

        if (duracionEstimadaValor == null || duracionEstimadaValor == undefined)
        throw new DuracionEstimadaCursoVacio(
          'El valor de duracion del curso no puede estar vacio.',
        )

      if (!['HORA','DIA','SEMANA','MES',].includes(duracionEstimadaEscala))
        throw new DuracionEscalaCursoInvalida(
            'La escala de duracion del curso no se encuentra entre los valores validos'
        )

        if (duracionEstimadaValor <= 0)
        throw new LongitudInvalidaDuracionValorCurso(
              'La duracion curso debe ser mayor a 0 caracteres'
          )
      if (duracionEstimadaValor > 99)
      throw new LongitudInvalidaDuracionValorCurso(
            'La duracion del curso no puede ser mayor a 99 caracteres'
        )

      // Si no hay errores
      return new DuracionEstimadaCurso(duracionEstimadaEscala, duracionEstimadaValor)
    }
  }