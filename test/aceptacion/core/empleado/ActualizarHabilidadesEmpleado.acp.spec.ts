import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { getRepository } from 'typeorm'
import { Auth } from '../../../../src/comun/infraestructura/dto/Auth.dto'
import { ModuloCoreEmpleado } from '../../../../src/core/empleado/infraestructura/api/core.empleado.module'
import { ActualizarHabilidadesEmpleadoApiDTO } from '../../../../src/core/empleado/infraestructura/dto/ActualizarHabilidadesEmpleado.api.dto'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EmpleadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Empleado.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { HabilidadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Habilidad.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

jest.mock(
  '../../../../src/core/empleado/infraestructura/api/core.empleado.module',
)

jest.mock('../../../../src/comun/infraestructura/middleware/sesion.middleware')

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

const DATOS_HABILIDADES: Auth<ActualizarHabilidadesEmpleadoApiDTO> = {
  idUsuario: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  uuid: [
    'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    '957c13dd-a70a-4466-a271-0c321340a3ed',
    'e1ac286d-48be-416b-b241-9120c8fd7281',
  ],
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const direccionORM = getRepository(DireccionORM)
  const empleadoORM = getRepository(EmpleadoORM)
  const habilidadORM = getRepository(HabilidadORM)

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

  const direccion = direccionORM.create({
    uuid: '53c876d7-aec1-4e82-a48b-656119fb76d8',
    calle_uno: 'Av. Francisco de Miranda',
    calle_dos: 'Res. Pacheco',
    codigo_postal: '1070',
    ciudad,
  })
  await direccionORM.save(direccion)

  const empleado = empleadoORM.create({
    uuid: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
    correo_electronico: 'carlosruiz@gmail.com',
    estatus: 'DISPONIBLE',
    genero: 'MASCULINO',
    nivel_educativo: 'SECUNDARIA',
    fecha_nacimiento: new Date('01-31-1999'),
    telefono: '+584161234598',
    primer_nombre: 'Carlos',
    primer_apellido: 'Ruiz',
    segundo_nombre: 'José',
    segundo_apellido: 'Perez',
    token: '9e8ae79a-298b-47d3-a399-4d9a2b1951fb',
    direccion,
  })
  await empleadoORM.save(empleado)

  const habilidades = [
    habilidadORM.create({
      uuid: 'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    }),
    habilidadORM.create({
      uuid: '957c13dd-a70a-4466-a271-0c321340a3ed',
    }),
    habilidadORM.create({
      uuid: 'e1ac286d-48be-416b-b241-9120c8fd7281',
    }),
  ]
  await habilidadORM.save(habilidades)
}

describe('Aceptación - Core/Empleado: Actualizar habilidades para un empleado', () => {
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

  it('Deberia actualizar las habilidades para un empleado', () => {
    return request(http)
      .put('/api/empleado/habilidades')
      .send(DATOS_HABILIDADES)
      .expect(HttpStatus.OK)
  })

  it('Deberia rechazar la actualización de las habilidades debido a que el empleado no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_HABILIDADES }
    DATOS_INVALIDOS.idUsuario = '1179466b-6198-4d4a-8d2b-bdfeea40c010'
    return request(http)
      .put('/api/empleado/habilidades')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        mensaje: 'El empleado no se encuentra registrado.',
        origen: 'EmpleadoNoExiste',
      })
  })

  it('Deberia rechazar la actualización de las habilidades debido a que se especifico una habilidad vacia', () => {
    const DATOS_INVALIDOS = { ...DATOS_HABILIDADES }
    DATOS_INVALIDOS.uuid[0] = ''
    return request(http)
      .put('/api/empleado/habilidades')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        mensaje: 'El identificador de la habilidad no puede estar vacio.',
        origen: 'IdentificadorHabilidadVacio',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
