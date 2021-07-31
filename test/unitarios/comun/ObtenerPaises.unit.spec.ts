import { ServicioObtenerPaises } from '../../../src/comun/aplicacion/servicios/ServicioObtenerPaises'
import { RepositorioUbicaciones } from '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones'

jest.mock(
  '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones',
)

const PAISES = [
  {
    id: '2e01e576-18da-4117-a744-41b463039176',
    nombre: 'Colombia',
  },
  {
    id: 'dc628455-07e6-442a-bb1a-984475145c7c',
    nombre: 'Peru',
  },
  {
    id: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    nombre: 'Venezuela',
  },
]

describe('Unitario - Común: Obtener listado de paises', () => {
  let mockRepositorioUbicaciones: RepositorioUbicaciones

  let casoUso: ServicioObtenerPaises

  beforeAll(() => {
    mockRepositorioUbicaciones = new RepositorioUbicaciones()

    casoUso = new ServicioObtenerPaises(mockRepositorioUbicaciones)
  })

  it('Deberia retornar una lista con todos los paises registrados', () => {
    const resultado = casoUso.ejecutar()
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(PAISES)
    })
  })
})
