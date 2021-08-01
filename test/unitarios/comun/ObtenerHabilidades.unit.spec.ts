import { ServicioObtenerHabilidades } from '../../../src/comun/aplicacion/servicios/ServicioObtenerHabilidades'
import { RepositorioHabilidades } from '../../../src/comun/infraestructura/adaptadores/RepositorioHabilidades'

jest.mock(
  '../../../src/comun/infraestructura/adaptadores/RepositorioHabilidades',
)

const HABILIDADES = [
  {
    id: '9652021a-1f94-4184-81cf-ca4599decf64',
    categoria: 'Desarrollo',
    nombre: 'Python',
  },
  {
    id: 'be1808c7-b341-4807-954f-0bb3b1c92cb0',
    categoria: 'Desarrollo',
    nombre: 'Java',
  },
  {
    id: '9e6574bd-103f-4680-86ad-88b5640ec541',
    categoria: 'Desarrollo',
    nombre: 'DDDD',
  },
]

describe('Unitario - Común: Obtener habilidades registradas', () => {
  let mockRepositorioHabilidades: RepositorioHabilidades

  let casoUso: ServicioObtenerHabilidades

  beforeAll(() => {
    mockRepositorioHabilidades = new RepositorioHabilidades()

    casoUso = new ServicioObtenerHabilidades(mockRepositorioHabilidades)
  })

  it('Deberia retornar una lista con todas las habilidades registradas', () => {
    const resultado = casoUso.ejecutar()

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(HABILIDADES)
    })
  })
})
