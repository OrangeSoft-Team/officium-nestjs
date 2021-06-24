import { IServicioIdentificador } from '../../aplicacion/puertos/IServicioIdentificador'
import { v4 as uuidv4 } from 'uuid'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'

export class GeneradorIdentificadorUUID implements IServicioIdentificador {
  public generarIdentificador(): IdentificadorDTO {
    return { id: uuidv4() }
  }
}
