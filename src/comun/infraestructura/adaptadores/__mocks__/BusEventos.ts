import { IBusEventos } from '../../../aplicacion/IBusEventos'
import { IEventoDominio } from '../../../dominio/IEventoDominio'

export class BusEventos implements IBusEventos {
  public eventos: IEventoDominio[] = []
  public async publicar(eventos: IEventoDominio[]): Promise<void> {
    eventos.forEach((evento) => this.eventos.push(evento))
  }
}
