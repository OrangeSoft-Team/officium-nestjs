import { HttpException, HttpStatus } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'

type METODOS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const codigos = [
  {
    http: HttpStatus.NOT_FOUND,
    metodos: ['GET'],
    nombres: ['PaisNoExiste', 'EstadoNoExiste'],
  },
  {
    http: HttpStatus.INTERNAL_SERVER_ERROR,
    metodos: ['GET', 'POST'],
    nombres: ['ExcepcionAplicacion', 'Excepcion', 'Error'],
  },
]

export class ComunErrorHttpMapeador {
  // Obtener codigo HTTP del error obtenido
  public static manejarExcepcionComun(
    excepcion: ExcepcionAplicacion,
    metodo: METODOS,
  ) {
    for (const codigo of codigos) {
      if (
        codigo.nombres.includes(excepcion.getError().nombre) &&
        codigo.metodos.includes(metodo)
      )
        throw new HttpException(
          {
            error: excepcion.getError().error,
            nombre: excepcion.getError().nombre,
          },
          codigo.http,
        )
    }
    // Si el error no esta contemplado, retornar un 500 como fallback
    throw new HttpException(
      {
        error: 'No se ha podido procesar la solicitud.',
        nombre: 'ErrorProcesandoSolicitud',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}
