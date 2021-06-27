import { IdentificadorDTO } from '../../../aplicacion/dto/Identificador.dto'
import { IServicioIdentificador } from '../../../aplicacion/puertos/IServicioIdentificador'

export class GeneradorIdentificadorUUID implements IServicioIdentificador {
  generarIdentificador(): IdentificadorDTO {
    return { id: '1' }
  }
}
