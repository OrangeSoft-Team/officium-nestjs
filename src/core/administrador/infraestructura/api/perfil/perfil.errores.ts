import { HttpException, HttpStatus } from '@nestjs/common'
import { IExcepcionAplicacion } from '../../../../../comun/aplicacion/IExcepcionAplicacion'

type METODOS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const codigos = [
  {
    http: HttpStatus.BAD_REQUEST,
    metodos: ['PUT'],
    nombres: [
      'CargoAdministradorVacio',
      'LongitudInvalidaCargoAdministrador',
      'LongitudInvalidaCorreoElectronicoAdministrador',
      'FormatoIncorrectoCorreoElectronicoAdministrador',
      'IdentificadorAdministradorVacio',
      'PrimerNombreAdministradorVacio',
      'LongitudInvalidaPrimerNombreAdministrador',
      'PrimerApellidoAdministradorVacio',
      'LongitudInvalidaPrimerApellidoAdministrador',
    ],
  },
  {
    http: HttpStatus.NOT_FOUND,
    metodos: ['GET', 'PUT'],
    nombres: ['AdministradorNoExiste'],
  },
]

export class ErroresHttpPerfilAdministrador {
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
