import { RepositorioPaises } from '../../../src/comun/infraestructura/adaptadores/RepositorioPaises'
import { RepositorioEstados } from '../../../src/comun/infraestructura/adaptadores/RepositorioEstados'
import { ObtenerEstados } from '../../../src/comun/aplicacion/servicios/ObtenerEstados'
import { PaisNoExiste } from '../../../src/comun/aplicacion/excepciones/PaisNoExiste'

// Mock del repositorio de persistencia de Paises
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioPaises')
// Mock del repositorio de persistencia de Estados
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioEstados')

describe('Común: Obtener todos los paises registrados en el sistema', () => {
  let mockRepositorioPaises: RepositorioPaises
  let mockRepositorioEstados: RepositorioEstados
  let casoUso: ObtenerEstados

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioPaises = new RepositorioPaises(null)
    mockRepositorioEstados = new RepositorioEstados(null, null)
    casoUso = new ObtenerEstados(mockRepositorioEstados, mockRepositorioPaises)
  })

  it('Debe devolver una lista de todos los estados registrados para un país', () => {
    const resultado = casoUso.ejecutar({
      idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(3)
      expect(res.error).toBeUndefined()
    })
  })

  it('Debe devolver una lista vacia de estados para un país que no posea', () => {
    const resultado = casoUso.ejecutar({
      idPais: 'c2928b44-77bc-469e-9f23-8cdb48628dac',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(0)
      expect(res.error).toBeUndefined()
    })
  })

  it('Debe rechazar la solicitud debido a que el país no existe', () => {
    const resultado = casoUso.ejecutar({
      idPais: 'c2928b44-77bc-469e-9f23-4985u4980549',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.valor).toBeNull()
      expect(res.error).toBeInstanceOf(PaisNoExiste)
    })
  })
})
