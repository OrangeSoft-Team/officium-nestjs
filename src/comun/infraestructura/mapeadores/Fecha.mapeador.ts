import { HttpException, HttpStatus } from '@nestjs/common'

export class MapeadorFecha {
  public static formatear(fecha: Date): string {
    return fecha.toLocaleDateString('es', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  public static transformar(fecha: string): Date {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(fecha))
      throw new HttpException(
        {
          mensaje: 'El formato de la fecha debe ser "dd/mm/yyyy".',
          origen: 'FormatoFechaInvalido',
        },
        HttpStatus.BAD_REQUEST,
      )
    const valores = fecha.split('/')
    const dd = parseInt(valores[0])
    const mm = parseInt(valores[1])
    const aaaa = parseInt(valores[2])
    return new Date(`${mm}-${dd}-${aaaa}`)
  }
}
