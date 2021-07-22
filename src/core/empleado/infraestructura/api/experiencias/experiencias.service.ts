import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ComandoAgregarExperienciaLaboral } from '../../cqrs/comandos/AgregarExperienciaLaboralEmpleado.comando'

@Injectable()
export class ServicioApiExperienciasEmpleado {
  public constructor(private readonly busComandos: CommandBus) {}

  public async crearExperienciaLaboral(
    comando: ComandoAgregarExperienciaLaboral,
  ) {
    return this.busComandos.execute(comando)
  }
}
