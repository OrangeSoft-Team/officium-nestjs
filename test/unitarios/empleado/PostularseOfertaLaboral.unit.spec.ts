import { RepositorioPostulaciones } from '../../../src/empleado/infraestructura/adaptadores/RepositorioPostulaciones'
import { GeneradorIdentificadorUUID } from '../../../src/comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'
import { PostularseOfertaLaboral } from '../../../src/empleado/aplicacion/servicios/PostularseOfertaLaboral'
import { EmpleadoNoExiste } from '../../../src/empleado/aplicacion/excepciones/EmpleadoNoExiste'
import { LongitudInvalidaComentarioPostulacion } from '../../../src/empleado/dominio/excepciones/postulacion/ComentarioPostulacion.excepciones'
import { RepositorioEmpleado } from '../../../src/empleado/infraestructura/adaptadores/RepositorioEmpleado'
import { RepositorioOfertaLaboral } from '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral'
import { OfertaLaboralNoExiste } from '../../../src/empleado/aplicacion/excepciones/OfertaLaboralNoExiste'

// Mock del repositorio de persistencia de Postulaciones
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioPostulaciones',
)
// Mock del servicio generador de identificadores unicos
jest.mock(
  '../../../src/comun/infraestructura/adaptadores/GeneradorIdentificadorUUID',
)
// Mock del repositorio de persistencia de Empleado
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioEmpleado',
)
// Mock del repositorio de persistencia de Oferta Laboral
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioOfertaLaboral',
)

describe('Empleado: Postularse para una oferta laboral publicada', () => {
  let mockRepositorioPostulaciones: RepositorioPostulaciones
  let mockRepositorioEmpleado: RepositorioEmpleado
  let mockRepositorioOfertaLaboral: RepositorioOfertaLaboral
  let mockGeneradorIdentificador: GeneradorIdentificadorUUID
  let casoUso: PostularseOfertaLaboral

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioPostulaciones = new RepositorioPostulaciones()
    mockGeneradorIdentificador = new GeneradorIdentificadorUUID()
    mockRepositorioEmpleado = new RepositorioEmpleado()
    mockRepositorioOfertaLaboral = new RepositorioOfertaLaboral()
    casoUso = new PostularseOfertaLaboral(
      mockGeneradorIdentificador,
      mockRepositorioPostulaciones,
      mockRepositorioEmpleado,
      mockRepositorioOfertaLaboral,
    )
  })

  it('Debe crear una nueva postulación para una oferta laboral con todos los datos validos', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1300b8ee-73a0-42de-8464-ed4998dc9a10',
      idOferta: '79bff1ce-5487-4e57-bb06-3f1b17991271',
      comentario: 'Comentario de prueba',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
    })
  })

  it('Debe rechazar la postulación a la oferta laboral debido a que esta no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '79bff1ce-73a0-42de-8464-ed4998dc9a10',
      idOferta: 'noexiste-5487-4e57-bb06-3f1b17991271',
      comentario: 'Comentario de prueba',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(OfertaLaboralNoExiste)
    })
  })

  it('Debe rechazar la postulación a la oferta laboral debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: 'noexiste-73a0-42de-8464-ed4998dc9a10',
      idOferta: '79bff1ce-5487-4e57-bb06-3f1b17991271',
      comentario: 'Comentario de prueba',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })

  it('Debe rechazar la postulación debido a que el comentario es muy corto', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1300b8ee-73a0-42de-8464-ed4998dc9a10',
      idOferta: '79bff1ce-5487-4e57-bb06-3f1b17991271',
      comentario: 'Comentario',
    })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(LongitudInvalidaComentarioPostulacion)
    })
  })
})
