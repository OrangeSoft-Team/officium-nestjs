import { ServicioObtenerPerfilEmpresa } from '../../../../src/core/empleador/aplicacion/servicios/ServicioObtenerPerfilEmpresa'
import { EmpresaNoExiste } from '../../../../src/core/empleador/dominio/excepciones/empresa/Empresa.excepciones'
import { RepositorioDirecciones } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioDirecciones'
import { RepositorioEmpresas } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas'
import { RepositorioHabilidades } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioHabilidades'

jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioDirecciones',
)
jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas',
)
jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioHabilidades',
)

describe('Unitario - Core/Empleador: Obtener perfil de la empresa', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas
  let mockRepositorioDirecciones: RepositorioDirecciones
  let mockRepositorioHabilidades: RepositorioHabilidades

  let casoUso: ServicioObtenerPerfilEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()
    mockRepositorioDirecciones = new RepositorioDirecciones()
    mockRepositorioHabilidades = new RepositorioHabilidades()

    casoUso = new ServicioObtenerPerfilEmpresa(
      mockRepositorioEmpresas,
      mockRepositorioDirecciones,
      mockRepositorioHabilidades,
    )
  })

  it('Deberia mostrar la información del perfil de la empresa para una empresa valida', () => {
    const resultado = casoUso.ejecutar({ idEmpresa: '1' })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual({
        nombre: 'OrangeSoft',
        correo: 'orange@soft.com',
        requisitosEspeciales: 'Debe saber exprimir naranjas',
        calleUno: 'Av. La Naranja Exprimida',
        calleDos: 'Edificio Citrico',
        codigoPostal: 'ORANGE',
        idCiudad: '2e079520-97f6-4851-b894-373fa15a1725',
        idEstado: 'ba1008db-3c4f-4613-bb5e-71b5c0d444f0',
        idPais: '87bdfa74-ce5c-4e49-bd29-18c977cf2b7b',
        habilidades: [
          {
            categoria: 'Exprimir naranjas',
            id: '844ea890-8980-4600-950e-c464bc204585',
            nombre: 'Exprimir naranjas',
          },
        ],
      })
    })
  })

  it('Deberia rechazar la consulta del perfil de la empresa debido a que no existe', () => {
    const resultado = casoUso.ejecutar({ idEmpresa: '2' })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })
})
