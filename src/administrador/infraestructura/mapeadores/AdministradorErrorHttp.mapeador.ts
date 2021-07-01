import { HttpException, HttpStatus } from '@nestjs/common'
import { ExcepcionAplicacion } from '../../../comun/aplicacion/ExcepcionAplicacion'

type METODOS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const codigos = [
  {
    http: HttpStatus.BAD_REQUEST,
    metodos: ['POST'],
    nombres: [
      'CargoOfertaVacio',
      'LongitudInvalidaCargoOferta',
      'DescripcionOfertaVacia',
      'LongitudInvalidaDescripcionOferta',
      'DuracionOfertaInvalida',
      'DuracionOfertaNoEsNumero',
      'DuracionOfertaVacia',
      'EscalaDuracionOfertaInvalida',
      'EscalaDuracionOfertaVacia',
      'EstadoOfertaVacio',
      'EstadoOfertaInvalido',
      'FechaModificacionOfertaVacia',
      'FechaModificacionOfertaInvalida',
      'FechaPublicacionOfertaVacia',
      'FechaPublicacionOfertaInvalida',
      'NumeroVacantesOfertaInvalido',
      'NumeroVacantesOfertaVacio',
      'NumeroVacantesOfertaNoEsNumero',
      'SueldoOfertaInvalido',
      'SueldoOfertaNoEsNumero',
      'SueldoOfertaVacio',
      'LongitudInvalidaTituloOferta',
      'TituloOfertaVacio',
      'TurnoOfertaVacio',
      'TurnoOfertaInvalido',
      'OfertaLaboralYaExiste',
    ],
  },
  {
    http: HttpStatus.NOT_FOUND,
    metodos: ['GET', 'POST'],
    nombres: ['EmpresaNoExiste', 'OfertaLaboralNoExiste'],
  },
  {
    http: HttpStatus.INTERNAL_SERVER_ERROR,
    metodos: ['GET', 'POST'],
    nombres: ['ExcepcionAplicacion', 'Excepcion', 'Error'],
  },
]

export class AdministradorErrorHttpMapeador {
  // Obtener codigo HTTP del error obtenido
  public static manejarExcepcionEmpleador(
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
