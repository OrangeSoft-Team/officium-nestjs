import { Agregado } from '../../../../comun/dominio/Agregado'
import { CargoAdministrador } from '../values/administrador/CargoAdministrador'
import { CorreoElectronicoAdministrador } from '../values/administrador/CorreoElectronicoAdministrador'
import { IdentificadorAdministrador } from '../values/administrador/IdentificadorAdministrador'
import { NombreCompletoAdministrador } from '../values/administrador/NombreCompletoAdministrador'

export interface DatosAdministrador {
  identificador: IdentificadorAdministrador
  correoElectronico: CorreoElectronicoAdministrador
  nombreCompleto: NombreCompletoAdministrador
  cargo: CargoAdministrador
}

export class Administrador extends Agregado {
  private constructor(
    private readonly identificador: IdentificadorAdministrador,
    private correoElectronico: CorreoElectronicoAdministrador,
    private nombreCompleto: NombreCompletoAdministrador,
    private cargo: CargoAdministrador,
  ) {
    super()
  }

  public esIgual(administrador: Administrador): boolean {
    return this.identificador.esIgual(administrador.identificador)
  }

  public obtenerIdentificador() {
    return this.identificador.obtenerId()
  }

  public obtenerCorreoElectronico() {
    return this.correoElectronico.obtenerCorreo()
  }

  public obtenerPrimerNombre() {
    return this.nombreCompleto.obtenerPrimerNombre()
  }

  public obtenerPrimerApellido() {
    return this.nombreCompleto.obtenerPrimerApellido()
  }

  public obtenerCargo() {
    return this.cargo.obtenerCargo()
  }

  public editarPerfil(
    nombreCompleto: NombreCompletoAdministrador,
    cargo: CargoAdministrador,
  ) {
    this.nombreCompleto = nombreCompleto
    this.cargo = cargo

    this.agregarEvento({
      fecha: new Date(),
      nombre: 'PerfilAdministradorActualizado',
      datos: {
        idAdministrador: this.identificador.obtenerId(),
      },
    })
  }

  public static restaurar(datos: DatosAdministrador): Administrador {
    return new Administrador(
      datos.identificador,
      datos.correoElectronico,
      datos.nombreCompleto,
      datos.cargo,
    )
  }
}
