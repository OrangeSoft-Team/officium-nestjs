import { Entidad } from './Entidad'
import { IEventoDominio } from './IEventoDominio'

export abstract class Agregado extends Entidad {
  private eventos: IEventoDominio[]

  protected agregarEvento(eventoDominio: IEventoDominio): void {
    this.eventos.push(eventoDominio)
  }

  public limpiarEventos(): void {
    this.eventos = []
  }

  public obtenerEventos(): IEventoDominio[] {
    return this.eventos
  }
}
