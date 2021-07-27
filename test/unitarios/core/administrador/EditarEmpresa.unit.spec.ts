import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { EditarEmpresaComandoDTO } from '../../../../src/core/administrador/aplicacion/dto/comandos/EditarEmpresa.comando'
import { ServicioEditarEmpresa } from '../../../../src/core/administrador/aplicacion/servicios/ServicioEditarEmpresa'
import { EmpresaNoExiste } from '../../../../src/core/administrador/dominio/excepciones/empresa/Empresa.excepciones'
import { NombreEmpresaVacio } from '../../../../src/core/administrador/dominio/excepciones/empresa/NombreEmpresa.excepciones'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas',
)

const DATOS_EMPRESA: EditarEmpresaComandoDTO = {
  id: '22175c20-8ffe-4545-9e30-f35736cd5ff3',
  estatus: 'ACTIVO',
  nombre: 'NaranjaSoft',
  requisitosEspeciales: 'Debe saber exprimir naranjitas.',
}

describe('Unitario - Core/Administrador: Editar datos de una empresa actual', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas
  let mockBusEventos: BusEventos

  let casoUso: ServicioEditarEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()
    mockBusEventos = new BusEventos()

    casoUso = new ServicioEditarEmpresa(mockRepositorioEmpresas, mockBusEventos)

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Deberia editar una empresa con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar(DATOS_EMPRESA)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toBeUndefined()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'EmpresaEditada',
          datos: {
            idEmpresa: DATOS_EMPRESA.id,
          },
        },
      ])
    })
  })

  it('Deberia rechazar la edición de la empresa debido a que no existe', () => {
    const resultado = casoUso.ejecutar({
      ...DATOS_EMPRESA,
      id: '0',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })

  it('Deberia rechazar la edición de la empresa debido a que el nombre está vacio', () => {
    const resultado = casoUso.ejecutar({
      ...DATOS_EMPRESA,
      nombre: '',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(NombreEmpresaVacio)
    })
  })
})
