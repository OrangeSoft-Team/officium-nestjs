import { Agregado } from '../../../../comun/dominio/Agregado'
import { CorreoElectronicoEmpresa } from '../values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'

export interface DatosEmpresa {
  identificador: IdentificadorEmpresa
  nombre: NombreEmpresa
  correoElectronico: CorreoElectronicoEmpresa
  estatus: EstatusEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
}

export class Empresa extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorEmpresa,
    private nombre: NombreEmpresa,
    private correoElectronico: CorreoElectronicoEmpresa,
    private estatus: EstatusEmpresa,
    private requisitosEspeciales?: RequisitosEspecialesEmpresa,
  ) {
    super()
  }

  public esIgual(empresa: Empresa): boolean {
    return this.identificador.esIgual(empresa.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerNombre() {
    return this.nombre.obtenerNombre()
  }

  public obtenerCorreoElectronico() {
    return this.correoElectronico.obtenerCorreo()
  }

  public obtenerEstatus() {
    return this.estatus.obtenerEstatus()
  }

  public obtenerRequisitosEspeciales() {
    return this.requisitosEspeciales.obtenerRequisitos()
  }

  public static crear(datos: DatosEmpresa): Empresa {
    const empresa = new Empresa(
      datos.identificador,
      datos.nombre,
      datos.correoElectronico,
      datos.estatus,
      datos.requisitosEspeciales,
    )

    empresa.agregarEvento({
      fecha: new Date(),
      nombre: 'EmpresaCreada',
      datos: {
        idEmpresa: empresa.identificador.obtenerId(),
      },
    })

    return empresa
  }

  public static restaurar(datos: DatosEmpresa): Empresa {
    return new Empresa(
      datos.identificador,
      datos.nombre,
      datos.correoElectronico,
      datos.estatus,
      datos.requisitosEspeciales,
    )
  }
}
