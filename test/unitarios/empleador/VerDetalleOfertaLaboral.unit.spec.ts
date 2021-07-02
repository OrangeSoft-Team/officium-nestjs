import { RepositorioEmpresa } from '../../../src/empleador/infraestructura/adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { VerDetalleOfertaLaboral } from '../../../src/empleador/aplicacion/servicios/oferta/VerDetalleOfertaLaboral'
import { EmpresaNoExiste } from '../../../src/empleador/aplicacion/excepciones/empresa/EmpresaNoExiste'
import { OfertaLaboralNoExiste } from '../../../src/empleador/aplicacion/excepciones/oferta/OfertaLaboralNoExiste'

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
  let casoUso: VerDetalleOfertaLaboral

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioEmpresa = new RepositorioEmpresa(null)
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral(null, null)
    casoUso = new VerDetalleOfertaLaboral(
      mockRepositorioEmpresa,
      mockRepositorioOfertaLaboral,
    )
  })

  it('Debe obtener una oferta laboral con todos sus detalles cuando existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '1',
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
        duracionEstimadaEscala: 'mes',
        duracionEstimadaValor: 1,
        turno: 'diurno',
        numeroVacantes: 1,
      })
    })
  })

  it('Debe rechazar la ejecución debido a que la empresa no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '2',
      idOferta: '7453dc15-7ff2-4c37-9455-de661a5275b1',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })

  it('Debe rechazar la ejecución debido a que no existe una oferta laboral con esos datos para la empresa', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '3',
      idOferta: '7453dc15-7ff2-4c37-9455-de661a5275b1',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(OfertaLaboralNoExiste)
    })
  })
})
