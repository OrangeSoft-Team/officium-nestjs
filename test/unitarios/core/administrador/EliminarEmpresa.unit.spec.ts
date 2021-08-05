import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioEliminarEmpresa } from '../../../../src/core/administrador/aplicacion/servicios/ServicioEliminarEmpresa'
import { EmpresaNoExiste } from '../../../../src/core/administrador/dominio/excepciones/empresa/Empresa.excepciones'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas',
)

const ID_EMPRESA = '22175c20-8ffe-4545-9e30-f35736cd5ff3'

describe('Unitario - Core/Administrador: Eliminar empresa actual', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas
  let mockBusEventos: BusEventos

  let casoUso: ServicioEliminarEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()
    mockBusEventos = BusEventos.obtenerInstancia()

    casoUso = new ServicioEliminarEmpresa(
      mockRepositorioEmpresas,
      mockBusEventos,
    )

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Deberia eliminar una empresa valida', () => {
    const resultado = casoUso.ejecutar({ id: ID_EMPRESA })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toBeUndefined()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'EmpresaEliminada',
          datos: {
            idEmpresa: ID_EMPRESA,
          },
        },
      ])
    })
  })

  it('Deberia rechazar la eliminación debido a que la empresa no existe', () => {
    const resultado = casoUso.ejecutar({ id: '0' })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })
})
