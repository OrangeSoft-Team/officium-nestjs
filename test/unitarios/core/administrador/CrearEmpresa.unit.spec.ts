import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador'
import { CrearEmpresaComandoDTO } from '../../../../src/core/administrador/aplicacion/dto/comandos/CrearEmpresa.comando'
import { ServicioCrearEmpresa } from '../../../../src/core/administrador/aplicacion/servicios/ServicioCrearEmpresa'
import { EmpresaYaExiste } from '../../../../src/core/administrador/dominio/excepciones/empresa/Empresa.excepciones'
import { NombreEmpresaVacio } from '../../../../src/core/administrador/dominio/excepciones/empresa/NombreEmpresa.excepciones'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

jest.mock(
  '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador',
)

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas',
)

const DATOS_EMPRESA: CrearEmpresaComandoDTO = {
  correoElectronico: 'mandarina@soft.com',
  nombre: 'OrangeSoft',
  requisitosEspeciales: 'Debe saber exprimir mandarinas.',
  token: '547945789043',
}

describe('Unitario - Core/Administrador: Crear una nueva empresa', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas
  let mockServicioIdentificador: ServicioIdentificador
  let mockBusEventos: BusEventos

  let casoUso: ServicioCrearEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()
    mockServicioIdentificador = new ServicioIdentificador()
    mockBusEventos = new BusEventos()

    casoUso = new ServicioCrearEmpresa(
      mockRepositorioEmpresas,
      mockServicioIdentificador,
      mockBusEventos,
    )

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Deberia crear una nueva empresa con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar(DATOS_EMPRESA)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toBeUndefined()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'EmpresaCreada',
          datos: {
            idEmpresa: expect.any(String),
          },
        },
      ])
    })
  })

  it('Deberia rechazar la creación de la nueva empresa debido a que la empresa ya existe', () => {
    const resultado = casoUso.ejecutar({
      ...DATOS_EMPRESA,
      correoElectronico: 'orange@soft.com',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaYaExiste)
    })
  })

  it('Deberia rechazar la creación de la nueva empresa debido a que el nombre está vacio', () => {
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
