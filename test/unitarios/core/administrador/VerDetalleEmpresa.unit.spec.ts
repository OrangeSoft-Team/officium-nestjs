import { ServicioVerDetalleEmpresa } from '../../../../src/core/administrador/aplicacion/servicios/ServicioVerDetalleEmpresa'
import { EmpresaNoExiste } from '../../../../src/core/administrador/dominio/excepciones/empresa/Empresa.excepciones'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas',
)

const EMPRESA = {
  id: '22175c20-8ffe-4545-9e30-f35736cd5ff3',
  correoElectronico: 'orange@soft.com',
  estatus: 'ACTIVO',
  nombre: 'OrangeSoft',
  requisitosEspeciales: 'Debe saber exprimir naranjas.',
}

describe('Unitario - Core/Administrador: Ver detalle de la empresa registrada', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas

  let casoUso: ServicioVerDetalleEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()

    casoUso = new ServicioVerDetalleEmpresa(mockRepositorioEmpresas)
  })

  it('Deberia retornar los valores de la empresa registrada con todos sus detalles', () => {
    const resultado = casoUso.ejecutar({ id: EMPRESA.id })

    resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(EMPRESA)
    })
  })

  it('Deberia rechazar la consulta debido a que la empresa no existe', () => {
    const resultado = casoUso.ejecutar({ id: '0' })

    resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })
})
