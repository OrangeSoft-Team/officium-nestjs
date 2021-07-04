import { RepositorioEmpresa } from '../../../src/empleador/infraestructura/adaptadores/RepositorioEmpresa'
import { RepositorioOfertaLaboral } from '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { GeneradorIdentificadorUUID } from '../../../src/comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { CrearOfertaLaboral } from '../../../src/empleador/aplicacion/servicios/oferta/CrearOfertaLaboral'
import { LongitudInvalidaTituloOferta } from '../../../src/empleador/dominio/excepciones/oferta/TituloOferta.excepciones'
import { SueldoOfertaInvalido } from '../../../src/empleador/dominio/excepciones/oferta/SueldoOferta.excepciones'
import { EmpresaNoExiste } from '../../../src/empleador/aplicacion/excepciones/empresa/EmpresaNoExiste'

// Mock del repositorio de persistencia de Empresas
jest.mock(
  '../../../src/empleador/infraestructura/adaptadores/RepositorioEmpresa',
)
// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral',
)
// Mock del servicio generador de identificadores unicos
jest.mock(
  '../../../src/comun/infraestructura/adaptadores/GeneradorIdentificadorUUID',
)

describe('Empleador: Crear una nueva oferta laboral para la empresa', () => {
  let mockRepositorioEmpresa: RepositorioEmpresa
  let mockRepositorioOfertaLaboral: RepositorioOfertaLaboral
  let mockGeneradorIdentificador: GeneradorIdentificadorUUID
  let casoUso: CrearOfertaLaboral

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioEmpresa = new RepositorioEmpresa()
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral()
    mockGeneradorIdentificador = new GeneradorIdentificadorUUID()
    casoUso = new CrearOfertaLaboral(
      mockRepositorioOfertaLaboral,
      mockRepositorioEmpresa,
      mockGeneradorIdentificador,
    )
  })

  it('Debe crear una nueva oferta laboral con datos validos', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '1',
      titulo: 'Desarrollador en Python',
      cargo: 'Desarrollador',
      sueldo: 50000,
      descripcion:
        'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
      duracionEstimadaValor: 5,
      duracionEstimadaEscala: 'mes',
      turnoTrabajo: 'diurno',
      numeroVacantes: 1,
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
    })
  })

  it('Debe rechazar la creación de la oferta laboral debido a un titulo muy corto', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '1',
      titulo: 'DEP',
      cargo: 'Desarrollador',
      sueldo: 50000,
      descripcion:
        'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
      duracionEstimadaValor: 5,
      duracionEstimadaEscala: 'mes',
      turnoTrabajo: 'diurno',
      numeroVacantes: 1,
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(LongitudInvalidaTituloOferta)
    })
  })

  it('Debe rechazar la creación de la oferta laboral debido a un sueldo negativo', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '1',
      titulo: 'Desarrollador en Python',
      cargo: 'Desarrollador',
      sueldo: -1000,
      descripcion:
        'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
      duracionEstimadaValor: 5,
      duracionEstimadaEscala: 'mes',
      turnoTrabajo: 'diurno',
      numeroVacantes: 1,
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(SueldoOfertaInvalido)
    })
  })

  it('Debe rechazar la creación de la oferta laboral debido a que la empresa no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpresa: '2',
      titulo: 'Desarrollador en Python',
      cargo: 'Desarrollador',
      sueldo: 50000,
      descripcion:
        'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
      duracionEstimadaValor: 5,
      duracionEstimadaEscala: 'mes',
      turnoTrabajo: 'diurno',
      numeroVacantes: 1,
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })
})
