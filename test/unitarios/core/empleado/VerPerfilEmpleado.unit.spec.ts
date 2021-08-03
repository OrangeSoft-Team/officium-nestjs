import { VerPerfilEmpleadoRespuestaDTO } from '../../../../src/core/empleado/aplicacion/dto/queries/VerPerfilEmpleado.query'
import { ServicioVerPerfilEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioVerPerfilEmpleado'
import { EmpleadoNoExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/Empleado.excepciones'
import { RepositorioDirecciones } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'

jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioDirecciones',
)

jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

const DATOS_EMPLEADO: VerPerfilEmpleadoRespuestaDTO = {
  correo: 'rsca4321@gmail.com',
  primerNombre: 'Jose',
  primerApellido: 'Perez',
  segundoNombre: 'Antonio',
  segundoApellido: 'Gomez',
  numeroTelefonico: '+584141548952',
  nivelEducativo: 'SECUNDARIA',
  genero: 'MASCULINO',
  fechaNacimiento: new Date('06-16-1998'),
  calleUno: 'Calle Francia',
  calleDos: 'Res. Francisca',
  codigoPostal: '123456',
  idCiudad: 'e4e98e54-ad2e-4f58-a41c-21e01fa66828',
  idEstado: 'f74dfb72-5809-4efd-9f42-021f3314b2c2',
  idPais: 'f50e42ec-f098-46ea-a672-fc3df2d78f3d',
}

describe('Unitario - Core/Empleado: Ver perfil de un empleado', () => {
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockRepositorioDirecciones: RepositorioDirecciones

  let casoUso: ServicioVerPerfilEmpleado

  beforeAll(() => {
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockRepositorioDirecciones = new RepositorioDirecciones()

    casoUso = new ServicioVerPerfilEmpleado(
      mockRepositorioEmpleados,
      mockRepositorioDirecciones,
    )
  })

  it('Deberia retornar los datos del perfil de un empleado completo', () => {
    const resultado = casoUso.ejecutar({ id: '1' })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(DATOS_EMPLEADO)
    })
  })

  it('Deberia rechazar la consulta del perfil debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({ id: '0' })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })
})
