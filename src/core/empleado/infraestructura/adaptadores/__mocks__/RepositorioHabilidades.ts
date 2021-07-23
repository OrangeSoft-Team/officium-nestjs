/* eslint-disable @typescript-eslint/no-unused-vars */
import { IRepositorioHabilidades } from '../../../aplicacion/puertos/IRepositorioHabilidades'

const habilidadesEmpleados = [
  {
    idEmpleado: '1',
    idHabilidades: [
      '455e910e-21d2-4cff-b6e0-1de2731ae4e3',
      '59a3217f-6b85-4671-aa0e-0d585e3270a8',
      'f8aaf1fe-b293-4580-868c-1b51a21489c2',
    ],
  },
]

export class RepositorioHabilidades implements IRepositorioHabilidades {
  public async obtenerPorIdEmpleado(idEmpleado: string): Promise<string[]> {
    const idx = habilidadesEmpleados.findIndex(
      (habEmp) => habEmp.idEmpleado == idEmpleado,
    )
    if (idx == 1) return []
    return habilidadesEmpleados[idx].idHabilidades
  }

  public async actualizarPorIdEmpleado(
    idEmpleado: string,
    idHabilidades: string[],
  ): Promise<void> {
    return
  }
}
