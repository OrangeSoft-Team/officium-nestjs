import { RepositorioCursos } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos'
import { RepositorioEstudiantes } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes'
import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { RepositorioRespuestas } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioRespuestas'
import { ServicioResponderCuestionario } from '../../../../src/mooc/estudiante/aplicacion/servicios/ServicioResponderCuestionario'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes',
)
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioRespuestas',
)
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

describe('Unitario - Mooc/Empleado: Consultar Detalle de curso', () => {
  let mockRepositorioCursos: RepositorioCursos
  let mockRepositorioEstudiantes: RepositorioEstudiantes
  let mockRepositorioPreguntas: RepositorioRespuestas
  let mockBusEventos: BusEventos

  let casoUso: ServicioResponderCuestionario

  beforeAll(() => {
    mockRepositorioCursos = new RepositorioCursos()
    mockRepositorioEstudiantes = new RepositorioEstudiantes()
    mockRepositorioPreguntas = new RepositorioRespuestas()
    mockBusEventos = BusEventos.obtenerInstancia()

    casoUso = new ServicioResponderCuestionario(
      mockRepositorioPreguntas,
      mockRepositorioEstudiantes,
      mockRepositorioCursos,
      mockBusEventos,
    )

    //    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({
      uuidCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
      uuidCuestionario: 'ebaf050e-cd26-4ea1-9f26-2627bddcbbcb',
      uuidEstudiante: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
      respuestasCuestionario: [
        {
          uuidOpcion: 'aeded3af-56a5-4a49-874a-57231b57af28',
          uuidPregunta: 'aefed3af-56a5-4a49-874a-57231b57af28',
        },
      ],
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
    })
  })
})
