import { HttpStatus } from '@nestjs/common'

const codigos = [
  {
    http: HttpStatus.BAD_REQUEST,
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
    nombres: ['EmpresaNoExiste'],
  },
  {
    http: HttpStatus.INTERNAL_SERVER_ERROR,
    nombres: ['ExcepcionAplicacion', 'Excepcion', 'Error'],
  },
]

export class EmpleadorErrorHttpMapeador {
  public static obtenerCodigoHttp(nombre: string) {
    for (const codigo of codigos) {
      if (codigo.nombres.includes(nombre)) return codigo.http
    }
    return HttpStatus.INTERNAL_SERVER_ERROR
  }
}