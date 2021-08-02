import { ServicioConsultarCuestionario } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioConsultarCuestionario"
import { RepositorioCuestionarios } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCuestionarios"
import { RepositorioCursos } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos"

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)
jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCuestionarios',
  )


describe('Unitario - Mooc/Empleado: Consultar Detalle de curso', () => {
  let mockRepositorioCursos: RepositorioCursos
  let mockRepositorioCuestionarios: RepositorioCuestionarios


  let casoUso: ServicioConsultarCuestionario

  beforeAll(() => {

    mockRepositorioCursos = new RepositorioCursos()
    mockRepositorioCuestionarios = new RepositorioCuestionarios()

    casoUso = new ServicioConsultarCuestionario(
        mockRepositorioCursos,
        mockRepositorioCuestionarios,
    )
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({uuidCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e'})

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(
        {
            uuid: 'ebaf050e-cd26-4ea1-9f26-2627bddcbbcb',
            valorDuracion: 2,
            escalaDuracion: 'HORA',
            intentosPermitidos: 4,
            preguntasCuestionario: [
                {
                    uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
                    enunciado: 'Sabor favorito de helado de los estudiantes',
                    tipo: 'SIMPLE',
                    ponderacion: 10,
                    opciones: [{
                        uuid: 'aeded3af-56a5-4a49-874a-57231b57af28',
                        valor: 'Helado de fresa',
                    },
                    {
                        uuid: 'aeded3af-bba5-4a49-874a-57231b57af28',
                        valor: 'Helado de chocolate',
                    }
                    ]
                },
            ] ,
          },
      )
    })
  })
})