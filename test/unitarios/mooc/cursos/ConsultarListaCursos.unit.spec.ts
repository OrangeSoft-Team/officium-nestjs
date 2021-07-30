import { ServicioConsultarListaCursos } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioConsultarListaCursos"
import { RepositorioCursos } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos"

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)

describe('Unitario - Mooc/Empleado: Consultar listado de cursos', () => {
  let mockRepositorioCursos: RepositorioCursos

  let casoUso: ServicioConsultarListaCursos

  beforeAll(() => {
    mockRepositorioCursos =
      new RepositorioCursos()

    casoUso = new ServicioConsultarListaCursos(
        mockRepositorioCursos,
    )
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar()

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual([
        {
            uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
            titulo: 'Matematica basica',
            estatus: 'ACTIVO',
            fechaCreacion: new Date('09-06-2000'),
          },
      ])
    })
  })
})