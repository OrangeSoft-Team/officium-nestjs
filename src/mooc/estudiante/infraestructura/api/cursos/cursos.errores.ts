import { HttpException, HttpStatus } from '@nestjs/common'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

type METODOS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const codigos = []

export class ErroresHttpCursos {
  // Obtener codigo HTTP del error obtenido
  public static manejarExcepcion(
    excepcion: IExcepcionAplicacion,
    metodo: METODOS,
  ) {
    for (const codigo of codigos) {
      if (
        codigo.nombres.includes(excepcion.origen) &&
        codigo.metodos.includes(metodo)
      )
        throw new HttpException(excepcion.getError(), codigo.http)
    }
    // Si el error no esta contemplado, retornar un 500 como fallback
    throw new HttpException(
      {
        mensaje: 'No se ha podido procesar la solicitud.',
        origen: 'ErrorProcesandoSolicitud',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}
