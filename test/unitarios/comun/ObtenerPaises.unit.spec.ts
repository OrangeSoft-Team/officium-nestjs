import { ObtenerPaises } from '../../../src/comun/aplicacion/servicios/ObtenerPaises'
import { RepositorioPaises } from '../../../src/comun/infraestructura/adaptadores/RepositorioPaises'

// Mock del repositorio de persistencia de Paises
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioPaises')

describe('Común: Obtener todos los paises registrados en el sistema', () => {
  let mockRepositorioPaises: RepositorioPaises
  let casoUso: ObtenerPaises

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioPaises = new RepositorioPaises(null)
    casoUso = new ObtenerPaises(mockRepositorioPaises)
  })

  it('Debe devolver una lista de todos los paises registrados con un identificador y un nombre', () => {
    const resultado = casoUso.ejecutar()
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(3)
      expect(res.error).toBeUndefined()
    })
  })
})
