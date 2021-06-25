import { IdentificadorDTO } from '../dto/Identificador.dto'

export interface IServicioIdentificador {
  generarIdentificador(): IdentificadorDTO
}
