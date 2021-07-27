import { ServicioVerListaEmpresas } from '../../../../src/core/administrador/aplicacion/servicios/ServicioVerListaEmpresas'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas',
)

const EMPRESAS = [
  {
    id: '22175c20-8ffe-4545-9e30-f35736cd5ff3',
    correoElectronico: 'orange@soft.com',
    estatus: 'ACTIVO',
    nombre: 'OrangeSoft',
  },
  {
    id: '4d1debb8-828a-4314-89df-eef67896e2ad',
    correoElectronico: 'limon@soft.com',
    estatus: 'ACTIVO',
    nombre: 'LimonSoft',
  },
]

describe('Unitario - Core/Empleador: Ver lista de empresas registradas en el sistema', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas

  let casoUso: ServicioVerListaEmpresas

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()

    casoUso = new ServicioVerListaEmpresas(mockRepositorioEmpresas)
  })

  it('Deberia retornar una lista de todas las empresas registradas con sus datos básicos', () => {
    const resultado = casoUso.ejecutar()

    resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(EMPRESAS)
    })
  })
})
