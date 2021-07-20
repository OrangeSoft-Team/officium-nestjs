import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ComandoRegistrarEmpleado } from '../../cqrs/comandos/RegistrarEmpleado.comando'

@Injectable()
export class ServicioApiRegistroEmpleado {
  public constructor(private readonly busComandos: CommandBus) {}

  public async registrarEmpleado(comando: ComandoRegistrarEmpleado) {
    return this.busComandos.execute(comando)
  }
}
