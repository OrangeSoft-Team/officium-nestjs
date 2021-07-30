import { ListarEmpleadosRespuestaDTO } from '../../../../src/core/administrador/aplicacion/dto/queries/ListarEmpleados.query'
import { ServicioListarEmpleados } from '../../../../src/core/administrador/aplicacion/servicios/ServicioListarEmpleados'
import { RepositorioEmpleados } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpleados'

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpleados',
)

const EMPLEADOS: ListarEmpleadosRespuestaDTO[] = [
  {
    id: 'ebdb91e8-3a1e-4672-8261-980ca43d8185',
    correoElectronico: 'empleado@empleados.com',
    estatus: 'DISPONIBLE',
    genero: 'MASCULINO',
    primerNombre: 'José',
    primerApellido: 'Perez',
    segundoApellido: 'Villegas',
    segundoNombre: null,
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
  },
]

describe('Unitario - Core/Administrador: Listar empleados registrados en el sistema', () => {
  let mockRepositorioEmpleados: RepositorioEmpleados

  let casoUso: ServicioListarEmpleados

  beforeAll(() => {
    mockRepositorioEmpleados = new RepositorioEmpleados()

    casoUso = new ServicioListarEmpleados(mockRepositorioEmpleados)
  })

  it('Deberia retornar una lista con los datos basicos de todos los empleados registrados', () => {
    const respuesta = casoUso.ejecutar()

    return respuesta.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(EMPLEADOS)
    })
  })
})
