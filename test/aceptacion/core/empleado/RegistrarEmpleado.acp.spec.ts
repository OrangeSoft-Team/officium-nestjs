import * as request from 'supertest'
import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepository } from 'typeorm'
import { DatosRegistroEmpleadoApiDTO } from '../../../../src/core/empleado/infraestructura/dto/DatosRegistroEmpleado.api.dto'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'
import { ModuloCoreEmpleado } from '../../../../src/core/empleado/infraestructura/api/core.empleado.module'

jest.mock(
  '../../../../src/core/empleado/infraestructura/api/core.empleado.module',
)

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

const DATOS_EMPLEADO: DatosRegistroEmpleadoApiDTO = {
  correoElectronico: 'carlosruiz@gmail.com',
  genero: 'MASCULINO',
  nivelEducativo: 'SECUNDARIA',
  fechaNacimiento: '31/01/1999',
  numeroTelefonico: '+584161234598',
  primerNombre: 'Carlos',
  primerApellido: 'Ruiz',
  segundoNombre: 'José',
  segundoApellido: 'Perez',
  token: '9e8ae79a',
  uuidCiudad: 'c34d0ac0-c72a-42ff-91c3-76c665b60683',
  uuidEstado: 'ebaf090e-cd26-4ea1-9a26-2627bddcbbcb',
  uuidPais: 'aeded38f-56a5-4a49-874a-57231b57af28',
  calleUno: 'Av. Francisco de Miranda',
  calleDos: 'Res. Pacheco',
  codigoPostal: '1070',
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)

  const pais = paisORM.create({
    uuid: 'aeded38f-56a5-4a49-874a-57231b57af28',
    nombre: 'Venezuela',
  })
  await paisORM.save(pais)

  const estado = estadoORM.create({
    uuid: 'ebaf090e-cd26-4ea1-9a26-2627bddcbbcb',
    nombre: 'Distrito Capital',
    pais,
  })
  await estadoORM.save(estado)

  const ciudad = ciudadORM.create({
    uuid: 'c34d0ac0-c72a-42ff-91c3-76c665b60683',
    nombre: 'Caracas',
    estado,
  })
  await ciudadORM.save(ciudad)
}

describe('Aceptación - Core/Empleado: Registrar a un empleado', () => {
  let app: INestApplication
  let http: HttpServer

  beforeAll(async () => {
    // Creamos la aplicacion o modulo de testing de Nest.js para poder realizar la prueba e2e
    const moduloTesting = await Test.createTestingModule({
      imports: [ModuloCoreEmpleado],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()
    http = app.getHttpServer()

    await insertarDatosRequeridosPrueba()
  })

  it('Deberia registrar un empleado con todos los datos validos', async () => {
    return request(http)
      .post('/api/empleado/registrar')
      .send(DATOS_EMPLEADO)
      .expect(HttpStatus.CREATED)
  })

  it('Deberia rechazar la creación del empleado debido a que la ciudad no existe', () => {
    const DATOS = { ...DATOS_EMPLEADO }
    DATOS.uuidCiudad = '1'
    return request(http)
      .post('/api/empleado/registrar')
      .send(DATOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        mensaje: 'La ciudad especificada no se encuentra registrada.',
        origen: 'CiudadNoExiste',
      })
  })

  it('Deberia rechazar la creación del empleado debido a que ya existe', () => {
    return request(http)
      .post('/api/empleado/registrar')
      .send(DATOS_EMPLEADO)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        mensaje:
          'El empleado con el correo electrónico especificado ya se encuentra registrado.',
        origen: 'EmpleadoYaExiste',
      })
  })

  it('Deberia rechazar la creación del empleado debido a que hay un dato invalido', () => {
    const DATOS = { ...DATOS_EMPLEADO }
    DATOS.correoElectronico = 'carlosruiz1@gmail.com'
    DATOS.genero = 'MASCULIN'
    return request(http)
      .post('/api/empleado/registrar')
      .send(DATOS)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        mensaje:
          'El género del empleado debe ser "MASCULINO", "FEMENINO" u "OTRO".',
        origen: 'GeneroEmpleadoInvalido',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
