import { CrearCursoComandoDTO } from '../../aplicacion/dto/comandos/CrearCurso.comando'
import { ComandoCrearCurso } from '../cqrs/comandos/CrearCurso.comando'
export abstract class CursoApiMapeador {
 
  public static convertirComandoCrearCurso(
    comando: ComandoCrearCurso,
  ): CrearCursoComandoDTO {
    const datos = comando.datos
    return {
      titulo: datos.titulo,
      valorDuracion: datos.valorDuracion,
      escalaDuracion: datos.escalaDuracion,
      uuidHabilidades: []
    }
  }
}
