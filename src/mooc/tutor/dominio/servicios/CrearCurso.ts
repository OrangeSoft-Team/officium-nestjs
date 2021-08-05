import { IServicioDominio } from '../../../../comun/dominio/IServicioDominio'
import { Curso } from '../entidades/Curso'
import { IdentificadorCurso } from '../values/curso/IdentificadorCurso'
import { TituloCurso } from '../values/curso/TituloCurso'
import { DuracionEstimadaCurso } from '../values/curso/DuracionEstimadaCurso';
import { IdentificadorHabilidad } from '../values/habilidad/IdentificadorHabilidad';
import { EstatusCurso } from '../values/curso/EstatusCurso';
import { FechaCreacionCurso } from '../values/curso/FechaCreacionCurso';

export interface DatosCrearHabilidad{
  uuidHabilidad: IdentificadorHabilidad;
}

export interface DatosCrearCurso {
  identificador: IdentificadorCurso
  titulo: TituloCurso
  estatus: EstatusCurso
  duracionEstimada: DuracionEstimadaCurso
  fechaCreacion: FechaCreacionCurso
  uuidHabilidades: DatosCrearHabilidad[]
}

export abstract class CrearCurso implements IServicioDominio {
  public static crear(datos: DatosCrearCurso): Curso {
    return Curso.crear({
      identificador: datos.identificador,
      duracionEstimada: datos.duracionEstimada,
      titulo: datos.titulo,
      estatus: datos.estatus,
      fechaCreacion: datos.fechaCreacion,
      identificadoresHabilidades: datos.uuidHabilidades
    })
  }
}
