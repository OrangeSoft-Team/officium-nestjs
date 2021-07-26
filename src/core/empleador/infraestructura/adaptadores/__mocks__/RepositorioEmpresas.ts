import {
  DatosAutentificacionPersistenciaDTO,
  DatosBasicosEmpresaPersistenciaDTO,
  EmpresaPersistenciaDTO,
  InformacionSesionPersistenciaDTO,
  IRepositorioEmpresas,
} from '../../../aplicacion/puertos/IRepositorioEmpresas'

const empresas: EmpresaPersistenciaDTO[] = [
  {
    correoElectronico: 'orange@soft.com',
    id: '1',
    token: '1',
    estatus: 'ACTIVO',
    nombreEmpresa: 'OrangeSoft',
    requisitosEspeciales: 'Debe saber exprimir naranjas',
    idDireccion: '6a3dca98-801f-453c-9d22-ea0c8484d6ee',
  },
]

export class RepositorioEmpresas implements IRepositorioEmpresas {
  public async obtener(id: string): Promise<EmpresaPersistenciaDTO> {
    const indice = empresas.findIndex((empresa) => empresa.id == id)
    return empresas[indice]
  }

  public async actualizarDatos(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    datosBasicos: DatosBasicosEmpresaPersistenciaDTO,
  ): Promise<void> {
    return
  }

  public async autentificar(
    query: DatosAutentificacionPersistenciaDTO,
  ): Promise<InformacionSesionPersistenciaDTO> {
    return {
      valido:
        empresas.findIndex(
          (empresa) =>
            empresa.correoElectronico == query.correoElectronico &&
            empresa.token == query.token,
        ) != -1,
      id: empresas[
        empresas.findIndex(
          (empresa) =>
            empresa.correoElectronico == query.correoElectronico &&
            empresa.token == query.token,
        )
      ]?.id,
    }
  }
}
