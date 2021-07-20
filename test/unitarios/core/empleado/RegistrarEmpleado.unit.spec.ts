import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioRegistrarEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioRegistrarEmpleado'
import { CiudadNoExiste } from '../../../../src/core/empleado/dominio/excepciones/ciudad/CiudadNoExiste'
import { LongitudInvalidaCalleUnoDireccion } from '../../../../src/core/empleado/dominio/excepciones/direccion/CalleUnoDireccion.excepciones'
import { EmpleadoYaExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/EmpleadoYaExiste'
import { GeneroEmpleadoInvalido } from '../../../../src/core/empleado/dominio/excepciones/empleado/GeneroEmpleado.excepciones'
import { RepositorioCiudades } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioCiudades'
import { RepositorioDirecciones } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioDirecciones'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioEstados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEstados'
import { RepositorioPaises } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioPaises'

// Mock: Repositorio Paises
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioPaises',
)

// Mock: Repositorio Estados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEstados',
)

// Mock: Repositorio Ciudades
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioCiudades',
)

// Mock: Repositorio Direcciones
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioDirecciones',
)

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Servicio Identificador
jest.mock(
  '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador',
)

// Mock: Bus Eventos
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

describe('Unitario - Core/Empleado: Registrar un nuevo empleado en el sistema', () => {
  let mockRepositorioPaises: RepositorioPaises
  let mockRepositorioEstados: RepositorioEstados
  let mockRepositorioCiudades: RepositorioCiudades
  let mockRepositorioDirecciones: RepositorioDirecciones
  let mockRepositorioEmpleados: RepositorioEmpleados
  let mockServicioIdentificador: ServicioIdentificador
  let mockBusEventos: BusEventos

  let casoUso: ServicioRegistrarEmpleado

  beforeAll(() => {
    mockRepositorioPaises = new RepositorioPaises()
    mockRepositorioEstados = new RepositorioEstados()
    mockRepositorioCiudades = new RepositorioCiudades()
    mockRepositorioDirecciones = new RepositorioDirecciones()
    mockRepositorioEmpleados = new RepositorioEmpleados()
    mockServicioIdentificador = new ServicioIdentificador()
    mockBusEventos = new BusEventos()

    casoUso = new ServicioRegistrarEmpleado(
      mockRepositorioPaises,
      mockRepositorioEstados,
      mockRepositorioCiudades,
      mockRepositorioDirecciones,
      mockRepositorioEmpleados,
      mockServicioIdentificador,
      mockBusEventos,
    )
  })

  it('Debe registrar un empleado con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'carlosruiz@gmail.com',
      fechaNacimiento: new Date('01-31-1999'),
      genero: 'MASCULINO',
      nivelEducativo: 'SECUNDARIA',
      primerNombre: 'Carlos',
      primerApellido: 'Ruiz',
      segundoNombre: 'José',
      segundoApellido: 'Perez',
      telefono: '+584161234567',
      direccion: {
        calleUno: 'Av. Francisco de Miranda',
        calleDos: 'Res. Pacheco',
        codigoPostal: '1060',
        idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
        idEstado: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
        idCiudad: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
      },
      token: '$2a$04$PFmaEh9yvZmUF2lSBf3skuu/8qPgC.5weq36wcP1FGCFfc./l4V0K',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
    })
  })

  it('Debe rechazar el registro del empleado debido a que ya existe', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'rsca4321@gmail.com',
      fechaNacimiento: new Date('01-31-1999'),
      genero: 'MASCULINO',
      nivelEducativo: 'SECUNDARIA',
      primerNombre: 'Carlos',
      primerApellido: 'Ruiz',
      segundoNombre: 'José',
      segundoApellido: 'Perez',
      telefono: '+584161234567',
      direccion: {
        calleUno: 'Av. Francisco de Miranda',
        calleDos: 'Res. Pacheco',
        codigoPostal: '1060',
        idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
        idEstado: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
        idCiudad: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
      },
      token: '$2a$04$PFmaEh9yvZmUF2lSBf3skuu/8qPgC.5weq36wcP1FGCFfc./l4V0K',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoYaExiste)
    })
  })

  it('Debe rechazar el registro del empleado debido a que la ciudad no existe', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'carlosruiz@gmail.com',
      fechaNacimiento: new Date('01-31-1999'),
      genero: 'MASCULINO',
      nivelEducativo: 'SECUNDARIA',
      primerNombre: 'Carlos',
      primerApellido: 'Ruiz',
      segundoNombre: 'José',
      segundoApellido: 'Perez',
      telefono: '+584161234567',
      direccion: {
        calleUno: 'Av. Francisco de Miranda',
        calleDos: 'Res. Pacheco',
        codigoPostal: '1060',
        idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
        idEstado: '01c29aa0-c542-4d17-9bc6-d4cc3c9d9ae3',
        idCiudad: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
      },
      token: '$2a$04$PFmaEh9yvZmUF2lSBf3skuu/8qPgC.5weq36wcP1FGCFfc./l4V0K',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(CiudadNoExiste)
    })
  })

  it('Debe rechazar el registro del empleado debido a que el genero es invalido', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'carlosruiz@gmail.com',
      fechaNacimiento: new Date('01-31-1999'),
      genero: 'RANDOM',
      nivelEducativo: 'SECUNDARIA',
      primerNombre: 'Carlos',
      primerApellido: 'Ruiz',
      segundoNombre: 'José',
      segundoApellido: 'Perez',
      telefono: '+584161234567',
      direccion: {
        calleUno: 'Av. Francisco de Miranda',
        calleDos: 'Res. Pacheco',
        codigoPostal: '1060',
        idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
        idEstado: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
        idCiudad: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
      },
      token: '$2a$04$PFmaEh9yvZmUF2lSBf3skuu/8qPgC.5weq36wcP1FGCFfc./l4V0K',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(GeneroEmpleadoInvalido)
    })
  })

  it('Debe rechazar el registro del empleado debido a que la calle uno de la dirección es invalida', () => {
    const resultado = casoUso.ejecutar({
      correoElectronico: 'carlosruiz@gmail.com',
      fechaNacimiento: new Date('01-31-1999'),
      genero: 'MASCULINO',
      nivelEducativo: 'SECUNDARIA',
      primerNombre: 'Carlos',
      primerApellido: 'Ruiz',
      segundoNombre: 'José',
      segundoApellido: 'Perez',
      telefono: '+584161234567',
      direccion: {
        calleUno: 'A',
        calleDos: 'Res. Pacheco',
        codigoPostal: '1060',
        idPais: '8f1e4392-1250-403d-aef8-186455cdb163',
        idEstado: '10d7e05f-2073-4cc3-a9bd-b1d44fb9ca57',
        idCiudad: '984fa2f1-a838-4f43-ab70-2d2f7161a6d9',
      },
      token: '$2a$04$PFmaEh9yvZmUF2lSBf3skuu/8qPgC.5weq36wcP1FGCFfc./l4V0K',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(LongitudInvalidaCalleUnoDireccion)
    })
  })
})
