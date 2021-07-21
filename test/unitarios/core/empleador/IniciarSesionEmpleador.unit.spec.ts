// Mock: Repositorio Empresas
import { ServicioIniciarSesionEmpresa } from '../../../../src/core/empleador/aplicacion/servicios/ServicioIniciarSesionEmpleado'
import { AutentificacionEmpresaInvalida } from '../../../../src/core/empleador/dominio/excepciones/empresa/AutentificacionEmpresaInvalida'
import { RepositorioEmpresas } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas'

// mock del Repositorio Empresas
jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas',
)

describe('Unitario - Core/Empleador: Autentificar datos del empleador', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas

  let casoUso: ServicioIniciarSesionEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()

    casoUso = new ServicioIniciarSesionEmpresa(mockRepositorioEmpresas)
  })

  it('Debe validar los datos de autentificación de la empresa correctamente', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'orange@soft.com',
      token: '1',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor.id).toBe('1')
    })
  })

  it('Debe arrojar una excepción de autentificación para datos invalidos', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'orange@soft.com',
      token: '2',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(AutentificacionEmpresaInvalida)
    })
  })
})
