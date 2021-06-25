import { IServicioIdentificador } from '../../../comun/aplicacion/puertos/IServicioIdentificador'
import { Resultado } from '../../../comun/aplicacion/Resultado'
import { CrearOfertaLaboralEmpresaServicioDTO } from '../dto/CrearOfertaLaboralEmpresa.servicio.dto'
import { IRepositorioEmpresa } from '../puertos/IRepositorioEmpresa'
import { IRepositorioOfertaLaboral } from '../puertos/IRepositorioOfertaLaboral'

export class CrearOfertaLaboral {
  public constructor(
    private readonly repositorioOfertaLaboral: IRepositorioOfertaLaboral,
    private readonly repositorioEmpresa: IRepositorioEmpresa,
    private readonly servicioIdentificador: IServicioIdentificador,
  ) {}

  public ejecutar(solicitud: CrearOfertaLaboralEmpresaServicioDTO) {
    // implementar caso de uso
    return Resultado.ok<string>('prueba')
  }
}
