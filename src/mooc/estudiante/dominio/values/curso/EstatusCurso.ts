import { IValueObject } from '../../../../../comun/dominio/IValueObject'
import { EstatusCursoVacio, EstatusCursoInvalido} from '../../excepciones/curso/EstatusCurso.excepciones'

type ESTATUS_CURSO = 'ACTIVO' | 'INACTIVO'

export class EstatusCurso implements IValueObject {
    private constructor(private readonly estatus: ESTATUS_CURSO) {}
  
    public obtenerEstatus() {
      return this.estatus
    }
  
    public esIgual(estatus: EstatusCurso): boolean {
      return this.estatus == estatus.obtenerEstatus()
    }
  
    public static crear(estatus: ESTATUS_CURSO): EstatusCurso {
      // No debe ser vacio
      if (!estatus)
        throw new EstatusCursoVacio(
          'El estatus del curso no puede estar vacio.',
        )
        if(!['ACTIVO','INACTIVO'].includes(estatus))
        throw new EstatusCursoInvalido(
              'El estatus debe estar entre los tipos validos'
          )
      // Si no hay errores
      return new EstatusCurso(estatus)
    }
  }