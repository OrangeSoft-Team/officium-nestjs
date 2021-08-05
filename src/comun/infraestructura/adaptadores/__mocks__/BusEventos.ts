import { IBusEventos } from '../../../aplicacion/IBusEventos'
import { IEventoDominio } from '../../../dominio/IEventoDominio'

export class BusEventos implements IBusEventos {
  public static obtenerInstancia(): BusEventos {
    return new BusEventos()
  }

  public eventos: IEventoDominio[] = []
  public publicar(eventos: IEventoDominio[]) {
    eventos.forEach((evento) => this.eventos.push(evento))
  }
}
