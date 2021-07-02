import { RepositorioPostulaciones } from '../../../src/empleado/infraestructura/adaptadores/RepositorioPostulaciones'
import { RepositorioEmpleado } from '../../../src/empleado/infraestructura/adaptadores/RepositorioEmpleado'
import { ConsultarPostulaciones } from '../../../src/empleado/aplicacion/servicios/ConsultarPostulaciones'


// Mock del repositorio de persistencia de Postulaciones
jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioPostulaciones',
)
// Mock del repositorio de persistencia de Empleado

jest.mock(
  '../../../src/empleado/infraestructura/adaptadores/RepositorioEmpleado',
)

describe('empleado: Ver las postulaciones de un empleado', () => {
  let mockRepositorioPostulaciones: RepositorioPostulaciones
  let mockRepositorioEmpleado: RepositorioEmpleado
  let casoUso: ConsultarPostulaciones

  beforeEach(() => {
    // Para cada prueba generamos los mock de los servicios necesarios
    mockRepositorioPostulaciones = new RepositorioPostulaciones()
    mockRepositorioEmpleado = new RepositorioEmpleado()
    casoUso = new ConsultarPostulaciones(
        mockRepositorioPostulaciones,
        mockRepositorioEmpleado
    )
  })

  it('Debe obtener la informacion de postulaciones del empleado suministrado', () => {
    const resultado = casoUso.ejecutar({uuidEmpleado: '1300b8ee-73a0-42de-8464-ed4998dc9a10'})
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toHaveLength(1)
      expect(res.valor).toStrictEqual([
        {
          uuid: '4cfc2a56-dac3-11eb-8d19-0242ac130003',
          uuidOfertaLaboral: '619a07b2-dac3-11eb-8d19-0242ac130003',
          tituloOferta: 'Desarrollador en Python',
          cargoOferta: 'Desarrollador',
          empresaNombre: 'Officium',
          comentario: 'comentario de prueba con los caracteres necesarios',
        }
      ])
    })
  })
})