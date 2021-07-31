import { ServicioObtenerCiudades } from '../../../src/comun/aplicacion/servicios/ServicioObtenerCiudades'
import { RepositorioUbicaciones } from '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones'

jest.mock(
  '../../../src/comun/infraestructura/adaptadores/RepositorioUbicaciones',
)

const CIUDADES = [
  {
    id: '49569b81-2579-45ac-ada4-ee17eade3145',
    nombre: 'Caracas',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    idEstado: '943be322-5074-4550-9132-90a8a46e660b',
  },
  {
    id: 'be8bfd7a-3806-46df-9eef-12a449b66878',
    nombre: 'San Antonio',
    idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
    idEstado: 'be8bfd7a-3806-46df-9eef-12a449b66878',
  },
]

describe('Unitario - Común: Obtener listado de ciudades a partir del id de un país y estado', () => {
  let mockRepositorioUbicaciones: RepositorioUbicaciones

  let casoUso: ServicioObtenerCiudades

  beforeAll(() => {
    mockRepositorioUbicaciones = new RepositorioUbicaciones()

    casoUso = new ServicioObtenerCiudades(mockRepositorioUbicaciones)
  })

  it('Deberia retornar una lista con todas las ciudades del estado y país', () => {
    const resultado = casoUso.ejecutar({
      idPais: 'bfa803c2-4d33-42d1-911d-2bf1e8bde939',
      idEstado: '943be322-5074-4550-9132-90a8a46e660b',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual([CIUDADES[0]])
    })
  })
})
