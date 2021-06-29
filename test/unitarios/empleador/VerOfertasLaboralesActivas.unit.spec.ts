import { RepositorioEmpresa } from '../../../src/empleador/infraestructura/adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { VerOfertasLaboralesActivas } from '../../../src/empleador/aplicacion/servicios/VerOfertasLaboralesActivas'
import { EmpresaNoExiste } from '../../../src/empleador/aplicacion/excepciones/EmpresaNoExiste'

// Mock del repositorio de persistencia de Empresas
jest.mock(
  '../../../src/empleador/infraestructura/adaptadores/RepositorioEmpresa',
)
// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral',
)

describe('Empleador: Ver todas las ofertas laborales activas de la empresa', () => {
  let mockRepositorioEmpresa: RepositorioEmpresa
  let mockRepositorioOfertaLaboral: RepositorioOfertaLaboral
  let casoUso: VerOfertasLaboralesActivas

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioEmpresa = new RepositorioEmpresa(null)
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral(null, null)
    casoUso = new VerOfertasLaboralesActivas(
      mockRepositorioOfertaLaboral,
      mockRepositorioEmpresa,
    )
  })

  it('Debe obtener una oferta laboral con sus datos para una empresa valida', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '1',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(1)
      expect(res.valor).toStrictEqual([
        {
          cargo: 'Conserje a tiempo completo',
          duracionEstimadaEscala: 'mes',
          duracionEstimadaValor: 12,
          fechaPublicacion: new Date('11-09-2020'),
          id: 'c70ed168-98fe-4438-ad5c-006348a59e41',
          numeroVacantes: 1,
          sueldo: 15000,
          titulo: 'Conserje a tiempo completo',
          turnoTrabajo: 'mixto',
        },
      ])
    })
  })

  it('Debe rechazar la ejecución debido a que la empresa no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '2',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })

  it('Debe retornar un arreglo vacio para una empresa sin ofertas laborales', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '3',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(0)
    })
  })
})
