import { ServicioVerLeccion } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioVerLeccion"
import { RepositorioCursos } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos"
import { RepositorioLecciones } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioLecciones"

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos',
)
  jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioLecciones',
  )

describe('Unitario - Mooc/Empleado: Consultar Detalle de curso', () => {
  let mockRepositorioCursos: RepositorioCursos
  let mockRepositorioLecciones: RepositorioLecciones


  let casoUso: ServicioVerLeccion

  beforeAll(() => {

    mockRepositorioCursos = new RepositorioCursos()
    mockRepositorioLecciones = new RepositorioLecciones()

    casoUso = new ServicioVerLeccion(
        mockRepositorioCursos,
        mockRepositorioLecciones,
    )
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({
        uuidCurso: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
        uuidLeccion: 'aefed3af-56a5-4a49-874a-57231b57af28'
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(
        {
          uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
          titulo: 'Como el helado de fresa ha cambiado nuestro universo',
          descripcion: 'En esta leccion se analizara el helado de fresa y su importancia a lo largo de la historia',
          contenido: 'El helado de fresa, considerado por muchos el salvador de la humanidad, ha sido un componente indispensable de nuestra evolucion',    
        },
      )
    })
  })
})