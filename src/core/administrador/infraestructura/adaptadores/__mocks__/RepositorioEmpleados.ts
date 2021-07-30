import {
  EmpleadoPersistenciaDTO,
  IRepositorioEmpleados,
} from '../../../aplicacion/puertos/IRepositorioEmpleados'

const EMPLEADOS: EmpleadoPersistenciaDTO[] = [
  {
    id: 'ebdb91e8-3a1e-4672-8261-980ca43d8185',
    correoElectronico: 'empleado@empleados.com',
    estatus: 'DISPONIBLE',
    genero: 'MASCULINO',
    primerNombre: 'José',
    primerApellido: 'Perez',
    segundoApellido: 'Villegas',
    fechaNacimiento: new Date('06-16-1999'),
    segundoNombre: null,
    idDireccion: 'b3b78bfb-8ce5-424c-84f6-6b93e9dbd8c2',
  },
  {
    id: '99c43acf-f8f5-495f-a650-f495c16832f9',
    correoElectronico: 'empleado2@empleados.com',
    estatus: 'SUSPENDIDO',
    genero: 'FEMENINO',
    primerNombre: 'Andrea',
    primerApellido: 'Contreras',
    segundoNombre: 'Maria',
    segundoApellido: 'Quintero',
    fechaNacimiento: new Date('11-19-1997'),
    idDireccion: 'fb7862df-bb1b-4216-b257-9701d6fed80b',
  },
]

export class RepositorioEmpleados implements IRepositorioEmpleados {
  public async obtenerPorId(id: string): Promise<EmpleadoPersistenciaDTO> {
    const indice = EMPLEADOS.findIndex((emp) => emp.id == id)
    return EMPLEADOS[indice]
  }
  public async obtenerTodos(): Promise<EmpleadoPersistenciaDTO[]> {
    return EMPLEADOS
  }
}
