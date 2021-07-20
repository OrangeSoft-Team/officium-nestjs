import { IBusEventos } from '../../aplicacion/IBusEventos'
import { IEventoDominio } from '../../dominio/IEventoDominio'

export class BusEventos implements IBusEventos {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async publicar(eventos: IEventoDominio[]): Promise<void> {
    return
  }
}
