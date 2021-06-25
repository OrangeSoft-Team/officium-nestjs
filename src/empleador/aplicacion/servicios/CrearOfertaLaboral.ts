import { IServicioIdentificador } from '../../../comun/aplicacion/puertos/IServicioIdentificador'
import { IRepositorioEmpleador } from '../puertos/IRepositorioEmpleador'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'

export class CrearOfertaLaboral {
  public constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
    private readonly repositorioEmpleador: IRepositorioEmpleador,
    private readonly servicioIdentificador: IServicioIdentificador,
  ) {}

  public ejecutar() {
    return
  }
}
