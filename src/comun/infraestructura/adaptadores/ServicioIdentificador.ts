import { IServicioIdentificador } from '../../aplicacion/puertos/IServicioIdentificador'
import { v4 as uuidv4 } from 'uuid'

export class ServicioIdentificador implements IServicioIdentificador {
  public generarIdentificador(): string {
    return uuidv4()
  }
}
