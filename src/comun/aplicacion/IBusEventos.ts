import { IEventoDominio } from '../dominio/IEventoDominio'

export interface IBusEventos {
  publicar(eventos: IEventoDominio[]): void
}
