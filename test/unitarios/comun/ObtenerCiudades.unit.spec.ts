import { RepositorioCiudades } from '../../../src/comun/infraestructura/adaptadores/RepositorioCiudades'
import { RepositorioPaises } from '../../../src/comun/infraestructura/adaptadores/RepositorioPaises'
import { RepositorioEstados } from '../../../src/comun/infraestructura/adaptadores/RepositorioEstados'
import { ObtenerCiudades } from '../../../src/comun/aplicacion/servicios/ObtenerCiudades'
import { EstadoNoExiste } from '../../../src/comun/aplicacion/excepciones/EstadoNoExiste'
import { PaisNoExiste } from '../../../src/comun/aplicacion/excepciones/PaisNoExiste'

// Mock del repositorio de persistencia de Paises
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioPaises')
// Mock del repositorio de persistencia de Estados
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioEstados')
// Mock del repositorio de persistencia de Ciudades
jest.mock('../../../src/comun/infraestructura/adaptadores/RepositorioCiudades')

describe('Común: Obtener todos los paises registrados en el sistema', () => {
  let mockRepositorioPaises: RepositorioPaises
  let mockRepositorioEstados: RepositorioEstados
  let mockRepositorioCiuidades: RepositorioCiudades
  let casoUso: ObtenerCiudades

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioPaises = new RepositorioPaises(null)
    mockRepositorioEstados = new RepositorioEstados(null, null)
    mockRepositorioCiuidades = new RepositorioCiudades(null, null)
    casoUso = new ObtenerCiudades(
      mockRepositorioCiuidades,
      mockRepositorioEstados,
      mockRepositorioPaises,
    )
  })

  it('Debe devolver una lista de todas las ciudades del pais y estado especificado', () => {
    const resultado = casoUso.ejecutar({
      idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
      idEstado: '9f4bfd3f-5387-4743-a4f7-2dff53535aae',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(2)
      expect(res.error).toBeUndefined()
    })
  })

  it('Debe devolver una lista vacia de ciudades para un país y estado que no posean', () => {
    const resultado = casoUso.ejecutar({
      idPais: '0e7c5f37-4c67-4a21-96fc-6c23a40f9a61',
      idEstado: '050c1c92-06b9-441f-a87e-90cd902870b2',
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
      idEstado: '050c1c92-06b9-441f-a87e-90cd902870b2',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.valor).toBeNull()
      expect(res.error).toBeInstanceOf(PaisNoExiste)
    })
  })

  it('Debe rechazar la solicitud debido a que el país no posee el estado especificado', () => {
    const resultado = casoUso.ejecutar({
      idPais: '8aee381f-7d0f-47ab-ae4b-1b1bd76197f9',
      idEstado: '050c1c92-06b9-441f-a87e-90cd902870b2',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.valor).toBeNull()
      expect(res.error).toBeInstanceOf(EstadoNoExiste)
    })
  })
})
