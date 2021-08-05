import { RepositorioCursos } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos'
import { RepositorioEstudiantes } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes'
import { ServicioInscribirCursoEstudiante } from '../../../../src/mooc/estudiante/aplicacion/servicios/ServicioInscribirCursoEstudiante'
import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes',
)
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

describe('Unitario - Mooc/Empleado: Consultar Detalle de curso', () => {
  let mockRepositorioCursos: RepositorioCursos
  let mockRepositorioEstudiantes: RepositorioEstudiantes
  let mockBusEventos: BusEventos

  let casoUso: ServicioInscribirCursoEstudiante

  beforeAll(() => {
    mockRepositorioCursos = new RepositorioCursos()
    mockRepositorioEstudiantes = new RepositorioEstudiantes()
    mockBusEventos = BusEventos.obtenerInstancia()

    casoUso = new ServicioInscribirCursoEstudiante(
      mockRepositorioEstudiantes,
      mockRepositorioCursos,
      mockBusEventos,
    )

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({
      uuidCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
      uuidEstudiante: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'EmpleadoCursoInscrito',
          datos: {
            idEmpleado: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
            idCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
          },
        },
      ])
    })
  })
})
