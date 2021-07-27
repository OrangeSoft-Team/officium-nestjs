import {
  EmpresaPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../../aplicacion/puertos/IRepositorioEmpresas'

const empresas: EmpresaPersistenciaDTO[] = [
  {
    id: '22175c20-8ffe-4545-9e30-f35736cd5ff3',
    correoElectronico: 'orange@soft.com',
    estatus: 'ACTIVO',
    nombre: 'OrangeSoft',
    requisitosEspeciales: 'Debe saber exprimir naranjas.',
  },
  {
    id: '4d1debb8-828a-4314-89df-eef67896e2ad',
    correoElectronico: 'limon@soft.com',
    estatus: 'ACTIVO',
    nombre: 'LimonSoft',
    requisitosEspeciales: 'Debe saber exprimir limones.',
  },
]

export class RepositorioEmpresas implements IRepositorioEmpresas {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async editar(datos: EmpresaPersistenciaDTO): Promise<void> {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async crear(datos: EmpresaPersistenciaDTO): Promise<void> {
    return
  }

  public async existe(correo: string): Promise<boolean> {
    return (
      empresas.findIndex((empresa) => empresa.correoElectronico == correo) != -1
    )
  }

  public async obtenerTodas(): Promise<EmpresaPersistenciaDTO[]> {
    return empresas
  }

  public async obtenerPorId(id: string): Promise<EmpresaPersistenciaDTO> {
    const indice = empresas.findIndex((empresa) => empresa.id == id)
    return empresas[indice]
  }
}
