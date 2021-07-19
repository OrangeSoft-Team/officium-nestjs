import { IBusEventos } from '../../aplicacion/IBusEventos'
import { IEventoDominio } from '../../dominio/IEventoDominio'

export class BusEventos implements IBusEventos {
  public async publicar(eventos: IEventoDominio[]): Promise<void> {
    console.log('Eventos:')
    console.table(eventos)
    return
  }
}
