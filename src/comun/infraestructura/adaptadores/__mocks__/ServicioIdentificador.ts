import { IServicioIdentificador } from '../../../aplicacion/puertos/IServicioIdentificador'

export class ServicioIdentificador implements IServicioIdentificador {
  generarIdentificador(): string {
    return 'a0e545f7-bd11-43fd-b2c5-938e5b79bd1a'
  }
}
