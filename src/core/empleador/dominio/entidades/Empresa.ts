import { Agregado } from '../../../../comun/dominio/Agregado'
import { CorreoElectronicoEmpresa } from '../values/empresa/CorreoElectronicoEmpresa'
import { EstatusEmpresa } from '../values/empresa/EstatusEmpresa'
import { IdentificadorEmpresa } from '../values/empresa/IdentificadorEmpresa'
import { NombreEmpresa } from '../values/empresa/NombreEmpresa'
import { RequisitosEspecialesEmpresa } from '../values/empresa/RequisitosEspecialesEmpresa'
import { Direccion } from './Direccion'
import { Habilidad } from './Habilidad'

export interface DatosEmpresa {
  identificador: IdentificadorEmpresa
  nombre: NombreEmpresa
  correoElectronico: CorreoElectronicoEmpresa
  estatus: EstatusEmpresa
  requisitosEspeciales?: RequisitosEspecialesEmpresa
  direccion?: Direccion
  habilidades: Habilidad[]
}

export class Empresa extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorEmpresa,
    private nombre: NombreEmpresa,
    private correoElectronico: CorreoElectronicoEmpresa,
    private estatus: EstatusEmpresa,
    private direccion?: Direccion,
    private habilidades?: Habilidad[],
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

  public obtenerDireccion() {
    return this.direccion
  }

  public obtenerRequisitosEspeciales() {
    return this.requisitosEspeciales.obtenerRequisitos()
  }

  public obtenerHabilidades() {
    return this.habilidades
  }

  public editarPerfil(
    nombre: NombreEmpresa,
    direccion: Direccion,
    requisitosEspeciales?: RequisitosEspecialesEmpresa,
    habilidades?: Habilidad[],
  ) {
    this.nombre = nombre
    this.requisitosEspeciales = requisitosEspeciales
    this.direccion = direccion
    this.habilidades = habilidades

    this.agregarEvento({
      fecha: new Date(),
      nombre: 'PerfilEmpresaActualizado',
      datos: {
        idEmpresa: this.identificador.obtenerId(),
      },
    })
  }

  public static restaurar(datos: DatosEmpresa): Empresa {
    return new Empresa(
      datos.identificador,
      datos.nombre,
      datos.correoElectronico,
      datos.estatus,
      datos.direccion,
      datos.habilidades,
      datos.requisitosEspeciales,
    )
  }
}
