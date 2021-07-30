import { VerPerfilEmpleadoRespuestaDTO } from '../../../../src/core/administrador/aplicacion/dto/queries/VerPerfilEmpleado.query'
import { ServicioVerPerfilEmpleado } from '../../../../src/core/administrador/aplicacion/servicios/ServicioVerPerfilEmpleado'
import { EmpleadoNoExiste } from '../../../../src/core/administrador/dominio/excepciones/empleado/Empleado.excepciones'
import { RepositorioDirecciones } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioExperienciasLaborales'
import { RepositorioHabilidades } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioHabilidades'

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioDirecciones',
)

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpleados',
)

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioExperienciasLaborales',
)

jest.mock(
  '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioHabilidades',
)

const EMPLEADO: VerPerfilEmpleadoRespuestaDTO = {
  id: 'ebdb91e8-3a1e-4672-8261-980ca43d8185',
  correoElectronico: 'empleado@empleados.com',
  estatus: 'DISPONIBLE',
  genero: 'MASCULINO',
  primerNombre: 'José',
  primerApellido: 'Perez',
  segundoApellido: 'Villegas',
  fechaNacimiento: new Date('06-16-1999'),
  segundoNombre: null,
  calleUno: 'Av. La Naranja Exprimida',
  calleDos: 'Edificio Tropicana',
  codigoPostal: 'NARANJA',
  nombreCiudad: 'Caracas',
  nombreEstado: 'Distrito Capital',
  nombrePais: 'Venezuela',
  habilidades: [
    {
      id: '7bb8d302-8fcf-4013-a754-05231ed7ecfe',
      categoria: 'Desarrollo',
      nombre: 'Python',
    },
  ],
  experienciasLaborales: [
    {
      id: 'd4425fed-f793-4669-be4f-97ca5d1d3762',
      cargo: 'Gerente',
      nombreEmpresa: 'LimonSoft',
      fechaInicio: new Date('11-15-2020'),
      fechaFin: new Date('12-15-2020'),
    },
  ],
}

describe('Unitario - Core/Administrador: Ver el perfil completo de un empleado', () => {
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockRepositorioHabilidades: RepositorioHabilidades
  let mockRepositorioExperienciasLaborales: RepositorioExperienciasLaborales
  let mockRepositorioDirecciones: RepositorioDirecciones

  let casoUso: ServicioVerPerfilEmpleado

  beforeAll(() => {
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockRepositorioHabilidades = new RepositorioHabilidades()
    mockRepositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    mockRepositorioDirecciones = new RepositorioDirecciones()

    casoUso = new ServicioVerPerfilEmpleado(
      mockRepositorioEmpleados,
      mockRepositorioExperienciasLaborales,
      mockRepositorioHabilidades,
      mockRepositorioDirecciones,
    )
  })

  it('Deberia retornar el perfil del empleado con todos sus datos detallados', () => {
    const resultado = casoUso.ejecutar({ idEmpleado: EMPLEADO.id })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual(EMPLEADO)
    })
  })

  it('Deberia rechazar la consulta del perfil de un empleado debido a que no existe', () => {
    const resultado = casoUso.ejecutar({ idEmpleado: '0' })
    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })
})
