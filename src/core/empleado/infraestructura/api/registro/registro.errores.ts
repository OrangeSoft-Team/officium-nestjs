import { HttpException, HttpStatus } from '@nestjs/common'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

type METODOS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const codigos = [
  {
    http: HttpStatus.BAD_REQUEST,
    metodos: ['POST'],
    nombres: [
      'EmpleadoYaExiste',
      'IdentificadorCiudadVacio',
      'IdentificadorDireccionVacio',
      'CodigoPostalDireccionVacio',
      'LongitudInvalidaCodigoPostalDireccion',
      'CalleUnoDireccionVacia',
      'LongitudInvalidaCalleUnoDireccion',
      'LongitudInvalidaCalleDosDireccion',
      'CorreoElectronicoEmpleadoVacio',
      'LongitudInvalidaCorreoElectronicoEmpleado',
      'FormatoIncorrectoCorreoElectronicoEmpleado',
      'EmpleadoNoEsMayorDeEdad',
      'EstatusEmpleadoVacio',
      'EstatusEmpleadoInvalido',
      'FechaNacimientoEmpleadoVacia',
      'FechaNacimientoEmpleadoInvalida',
      'GeneroEmpleadoVacio',
      'GeneroEmpleadoInvalido',
      'IdentificadorEmpleadoVacio',
      'NivelEducativoEmpleadoVacio',
      'NivelEducativoEmpleadoInvalido',
      'PrimerNombreEmpleadoVacio',
      'LongitudInvalidaPrimerNombreEmpleado',
      'PrimerApellidoEmpleadoVacio',
      'LongitudInvalidaPrimerApellidoEmpleado',
      'LongitudInvalidaSegundoNombreEmpleado',
      'LongitudInvalidaSegundoApellidoEmpleado',
      'NumeroTelefonicoEmpleadoVacio',
      'LongitudInvalidaNumeroTelefonicoEmpleado',
      'FormatoIncorrectoNumeroTelefonicoEmpleado',
    ],
  },
  {
    http: HttpStatus.NOT_FOUND,
    metodos: ['GET', 'POST'],
    nombres: ['PaisNoExiste', 'EstadoNoExiste', 'CiudadNoExiste'],
  },
]

export class ErroresHttpRegistroEmpleado {
  // Obtener codigo HTTP del error obtenido
  public static manejarExcepcion(
    excepcion: IExcepcionAplicacion,
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
