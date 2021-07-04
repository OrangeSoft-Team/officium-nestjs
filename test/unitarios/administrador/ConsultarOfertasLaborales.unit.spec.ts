import { RepositorioOfertaLaboral } from '../../../src/administrador/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { ConsultarOfertasLaborales } from '../../../src/administrador/aplicacion/servicios/oferta/ConsultarOfertasLaboralesAdministrador'

// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/administrador/infraestructura/adaptadores/RepositorioOfertaLaboral',
)

describe('Administrador: Consultar todas las ofertas laborales activas', () => {
  let mockRepositorioOfertaLaboral: RepositorioOfertaLaboral
  let casoUso: ConsultarOfertasLaborales

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral()
    casoUso = new ConsultarOfertasLaborales(mockRepositorioOfertaLaboral)
  })

  it('Debe obtener una oferta laboral con sus datos para una empresa valida', () => {
    const resultado = casoUso.ejecutar()
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(1)
      expect(res.valor).toStrictEqual([
        {
          id: 'c70ed168-98fe-4438-ad5c-006348a59e41',
          titulo: 'Conserje a tiempo completo',
          fecha: new Date('11-09-2020'),
          cargo: 'Conserje',
          sueldo: 15000,
          duracionEstimadaValor: 12,
          duracionEstimadaEscala: 'mes',
          turnoTrabajo: 'mixto',
          numeroVacantes: 1,
          nombreEmpresa: 'Acme',
        },
      ])
    })
  })
})
