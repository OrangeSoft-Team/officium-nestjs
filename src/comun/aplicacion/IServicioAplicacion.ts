import { Resultado } from './Resultado'

export interface IServicioAplicacion {
  ejecutar(data: any): Promise<Resultado<any>>
}
