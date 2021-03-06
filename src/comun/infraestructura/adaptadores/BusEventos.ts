import { IBusEventos } from '../../aplicacion/IBusEventos'
import { IEventoDominio } from '../../dominio/IEventoDominio'
import { connect, Connection } from 'amqplib'

type EventoNest<T> = {
  [P in keyof T]: T[P]
} & { backend: 'Nest' }

export class BusEventos implements IBusEventos {
  private static instancia: BusEventos
  private amqp: Connection
  private readonly nombreCola: string

  private constructor() {
    this.nombreCola = 'Cola'
  }

  public static obtenerInstancia(): BusEventos {
    if (!BusEventos.instancia) {
      BusEventos.instancia = new BusEventos()
    }

    return BusEventos.instancia
  }

  public async publicar(eventos: IEventoDominio[]) {
    this.amqp = await connect(process.env.RUTA_AMQP)
    const canal = await this.amqp.createChannel()

    for (const evento of eventos) {
      const eventoNest: EventoNest<IEventoDominio> = {
        ...evento,
        backend: 'Nest',
      }
      const json = JSON.stringify(eventoNest)
      canal.sendToQueue(this.nombreCola, Buffer.from(json))
    }
  }
}
