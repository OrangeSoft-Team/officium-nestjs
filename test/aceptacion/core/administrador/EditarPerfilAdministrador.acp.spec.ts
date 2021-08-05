import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { getRepository } from 'typeorm'
import { Auth } from '../../../../src/comun/infraestructura/dto/Auth.dto'
import { ModuloCoreAdministrador } from '../../../../src/core/administrador/infraestructura/api/core.administrador.module'
import { ActualizarDatosBasicosAdministradorApiDTO } from '../../../../src/core/administrador/infraestructura/dto/ActualizarDatosBasicosAdministrador.api.dto'
import { AdministradorORM } from '../../../../src/core/administrador/infraestructura/persistencia/Administrador.orm'

jest.mock('../../../../src/comun/infraestructura/middleware/sesion.middleware')

jest.mock(
  '../../../../src/core/administrador/infraestructura/api/core.administrador.module',
)

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

const DATOS_ADMINISTRADOR = {
  id: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  cargo: 'Gerente',
  primerApellido: 'Perez',
  primerNombre: 'José',
  correoElectronico: 'admin@officium.com',
  token: '9e8ae79a-298b-47d3-a399-4d9a2b1951fb',
}

const DATOS_EDITAR: Auth<ActualizarDatosBasicosAdministradorApiDTO> = {
  idUsuario: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  cargo: 'Supervisor',
  primerApellido: 'Perezoso',
  primerNombre: 'Josélito',
}

const insertarDatosRequeridosPrueba = async () => {
  const administradorORM = getRepository(AdministradorORM)

  const administrador = administradorORM.create({
    uuid: DATOS_ADMINISTRADOR.id,
    cargo: DATOS_ADMINISTRADOR.cargo,
    correo_electronico: DATOS_ADMINISTRADOR.correoElectronico,
    primer_apellido: DATOS_ADMINISTRADOR.primerApellido,
    primer_nombre: DATOS_ADMINISTRADOR.primerNombre,
    token: DATOS_ADMINISTRADOR.token,
  })
  await administradorORM.save(administrador)
}

describe('Aceptación - Core/Empleador: Actualizar el perfil de un administrador', () => {
  let app: INestApplication
  let http: HttpServer

  beforeAll(async () => {
    // Creamos la aplicacion o modulo de testing de Nest.js para poder realizar la prueba e2e
    const moduloTesting = await Test.createTestingModule({
      imports: [ModuloCoreAdministrador],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()
    http = app.getHttpServer()

    await insertarDatosRequeridosPrueba()
  })

  it('Deberia actualizar el perfil de un administrador con todos sus datos validos', () => {
    return request(http)
      .put('/api/staff/perfil')
      .send(DATOS_EDITAR)
      .expect(HttpStatus.OK)
  })

  it('Deberia rechazar la actualización del perfil del administrador debido a que no existe', () => {
    return request(http)
      .put('/api/staff/perfil')
      .send({ ...DATOS_EDITAR, idUsuario: '0' })
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        origen: 'AdministradorNoExiste',
        mensaje: 'El administrador no se encuentra registrado.',
      })
  })

  it('Deberia rechazar la actualización del perfil del administrador debido a la longitud del primer nombre es invalida', () => {
    return request(http)
      .put('/api/staff/perfil')
      .send({ ...DATOS_EDITAR, primerNombre: 'Fe' })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        origen: 'LongitudInvalidaPrimerNombreAdministrador',
        mensaje:
          'El primer nombre del administrador debe contener como mínimo 3 caracteres.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
