import { ServicioObtenerEstados } from '../../../src/comun/aplicacion/servicios/ServicioObtenerEstados'
import { RepositorioUbicaciones } from '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones'

jest.mock(
  '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones',
)

const ESTADOS = [
  {
    id: '943be322-5074-4550-9132-90a8a46e660b',
    nombre: 'Distrito Capital',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
  },
  {
    id: 'be8bfd7a-3806-46df-9eef-12a449b66878',
    nombre: 'Miranda',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
  },
]

describe('Unitario - Común: Obtener listado de estados a partir del id de un país', () => {
  let mockRepositorioUbicaciones: RepositorioUbicaciones

  let casoUso: ServicioObtenerEstados

  beforeAll(() => {
    mockRepositorioUbicaciones = new RepositorioUbicaciones()

    casoUso = new ServicioObtenerEstados(mockRepositorioUbicaciones)
  })

  it('Deberia retornar una lista con todos los estados registrados del país', () => {
    const resultado = casoUso.ejecutar({
      idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(ESTADOS)
    })
  })
})
