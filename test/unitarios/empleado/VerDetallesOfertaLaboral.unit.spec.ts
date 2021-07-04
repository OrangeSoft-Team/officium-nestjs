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
      idOferta: '93c91278-dcfd-11eb-ba80-0242ac130004',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual({
        id: '93c91278-dcfd-11eb-ba80-0242ac130004',
        titulo: 'Contador de un taller de motocicletas',
        fechaPublicacion: new Date('06-06-2020'),
        fechaModificacion: new Date('06-08-2020'),
        cargo: 'Contador',
        sueldo: 50000,
        descripcion:
          'Se busca persona para llevar cuentas en un taller, con experiencia',
        duracionEstimadaValor: 8,
        duracionEstimadaEscala: 'semana',
        turnoTrabajo: 'diurno',
        numeroVacantes: 1,
        uuidEmpresa: '35b59754-d9fd-11eb-b8bc-0242ac130003',
        nombreEmpresa: 'El Perro Motociclon',
        direccionEmpresa: 'Av el Ejército, callejón Machado, 3312, Caracas',
      })
    })
  })
})
