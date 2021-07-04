import { RepositorioOfertaLaboral } from '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { ConsultarOfertasLaborales } from '../../../src/empleado/aplicacion/servicios/oferta/ConsultarOfertasLaborales'

// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral',
)

describe('empleado: Consultar todas las ofertas laborales activas', () => {
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
          titulo: 'Gerente de frutería',
          fecha: new Date('11-09-2020'),
          cargo: 'Gerente',
          sueldo: 10800,
          duracionEstimadaValor: 12,
          duracionEstimadaEscala: 'mes',
          turnoTrabajo: 'mixto',
          numeroVacantes: 1,
          nombreEmpresa: 'Kiwiiii',
        },
      ])
    })
  })
})
