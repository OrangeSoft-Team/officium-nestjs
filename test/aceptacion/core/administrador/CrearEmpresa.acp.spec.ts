import * as request from 'supertest'
import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { ModuloCoreAdministrador } from '../../../../src/core/administrador/infraestructura/api/core.administrador.module'
import { Auth } from '../../../../src/comun/infraestructura/dto/Auth.dto'
import { CrearEmpresaApiDTO } from '../../../../src/core/administrador/infraestructura/dto/CrearEmpresa.api.dto'

const EMPRESA: Auth<CrearEmpresaApiDTO> = {
  idUsuario: '1',
  correo: 'orange@soft.com',
  nombre: 'OrangeSoft',
  requisitosEspeciales: 'Debe saber exprimir naranjas.',
  token: '468948694684',
}

jest.mock('../../../../src/comun/infraestructura/middleware/sesion.middleware')

jest.mock(
  '../../../../src/core/administrador/infraestructura/api/core.administrador.module',
)

describe('Aceptación - Core/Administrador: Crear una nueva empresa', () => {
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
  })

  it('Deberia crear una nueva empresa con todos sus datos validos', () => {
    return request(http)
      .post('/api/staff/empresas')
      .send(EMPRESA)
      .expect(HttpStatus.CREATED)
  })

  it('Deberia rechazar la creación de la empresa debido a que la empresa ya existe', () => {
    return request(http)
      .post('/api/staff/empresas')
      .send({ ...EMPRESA })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        origen: 'EmpresaYaExiste',
        mensaje: 'La empresa ya se encuentra registrada.',
      })
  })

  it('Deberia rechazar la creación de la empresa debido a que el correo está vacío', () => {
    return request(http)
      .post('/api/staff/empresas')
      .send({ ...EMPRESA, correo: '' })
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        origen: 'CorreoElectronicoEmpresaVacio',
        mensaje: 'El correo electrónico de la empresa no puede estar vacío.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
