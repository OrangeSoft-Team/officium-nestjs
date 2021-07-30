import { RepositorioHabilidades } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioHabilidades"
import { ServicioConsultarDetalleCurso } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioConsultarDetalleCurso"
import { RepositorioCursos } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos"
import { RepositorioLecciones } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioLecciones"

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)
jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioHabilidades',
  )
  jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioLecciones',
  )

describe('Unitario - Mooc/Empleado: Consultar Detalle de curso', () => {
  let mockRepositorioCursos: RepositorioCursos
  let mockRepositorioLecciones: RepositorioLecciones
  let mockRepositorioHabilidades: RepositorioHabilidades


  let casoUso: ServicioConsultarDetalleCurso

  beforeAll(() => {

    mockRepositorioCursos = new RepositorioCursos()
    mockRepositorioHabilidades = new RepositorioHabilidades()
    mockRepositorioLecciones = new RepositorioLecciones()

    casoUso = new ServicioConsultarDetalleCurso(
        mockRepositorioCursos,
        mockRepositorioHabilidades,
        mockRepositorioLecciones,
    )
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({uuidCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e'})

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(
        {
            uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
            titulo: 'Matematica basica',
            estatus: 'ACTIVO',
            valorDuracion: 2,
            escalaDuracion:'DIA',
            fechaCreacion: new Date('09-06-2000'),
            lecciones: [
                {
                    uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
                    titulo: 'Como el helado de fresa ha cambiado nuestro universo',
                },
            ] ,
            habilidades: [
                {
                uuid: 'aeaed3af-56a5-4a49-874a-57231b57af28',
                nombre: 'Preparar helado correctamente',
                categoria: 'Heladeria',
                },
            ] ,
            fechaUltimaModificacion :new Date('09-06-2020'),
          },
      )
    })
  })
})