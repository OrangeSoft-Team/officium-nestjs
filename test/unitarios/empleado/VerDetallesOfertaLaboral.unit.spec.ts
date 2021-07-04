import { RepositorioOfertaLaboral } from '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { VerDetallesOfertaLaboral } from '../../../src/empleado/aplicacion/servicios/oferta/VerDetallesOfertaLaboral'

// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral',
)

describe('empleado: Ver Detalles de Oferta laboral suministrada', () => {
  let mockRepositorioOfertaLaboral: RepositorioOfertaLaboral
  let casoUso: VerDetallesOfertaLaboral

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral()
    casoUso = new VerDetallesOfertaLaboral(mockRepositorioOfertaLaboral)
  })

  it('Debe obtener una oferta laboral con sus datos para una empresa valida', () => {
    const resultado = casoUso.ejecutar({
      idOferta: '7453dc15-7ff2-4c37-9455-de661a5275b1',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual({
        id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
        titulo: 'Desarrollador en Python',
        fechaPublicacion: new Date('06-06-2020'),
        fechaModificacion: new Date('06-08-2020'),
        cargo: 'Desarrollador',
        sueldo: 50000,
        descripcion:
          'Se busca desarrollador en python moderno con amplios conocimientos en los principios SOLID.',
        duracionEstimadaValor: 1,
        duracionEstimadaEscala: 'mes',
        turnoTrabajo: 'diurno',
        numeroVacantes: 1,
        uuidEmpresa: '35b59754-d9fd-11eb-b8bc-0242ac130003',
        nombreEmpresa: 'Officium',
        direccionEmpresa: 'Av el Ejército, callejón Machado, 3312, Caracas',
      })
    })
  })
})
