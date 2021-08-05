import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import * as request from 'supertest'
import { getRepository } from 'typeorm'
import { Auth } from '../../../../src/comun/infraestructura/dto/Auth.dto'
import { ModuloCoreEmpleador } from '../../../../src/core/empleador/infraestructura/api/core.empleador.module'
import { ActualizarDatosBasicosEmpleadorApiDTO } from '../../../../src/core/empleador/infraestructura/dto/ActualizarDatosBasicosEmpleador.api.dto'
import { CiudadORM } from '../../../../src/core/empleador/infraestructura/persistencia/Ciudad.orm'
import { EmpresaORM } from '../../../../src/core/empleador/infraestructura/persistencia/Empresa.orm'
import { EstadoORM } from '../../../../src/core/empleador/infraestructura/persistencia/Estado.orm'
import { HabilidadORM } from '../../../../src/core/empleador/infraestructura/persistencia/Habilidad.orm'
import { PaisORM } from '../../../../src/core/empleador/infraestructura/persistencia/Pais.orm'

jest.mock(
  '../../../../src/core/empleador/infraestructura/api/core.empleador.module',
)

jest.mock('../../../../src/comun/infraestructura/middleware/sesion.middleware')

jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

const DATOS_PERFIL: Auth<ActualizarDatosBasicosEmpleadorApiDTO> = {
  idUsuario: '1069dfaf-4740-4a05-821e-c22f4538ae91',
  nombreEmpresa: 'LimonSoft',
  calleUno: 'Av. El Limon Exprimido',
  calleDos: 'Edificio Limonada',
  codigoPostal: 'LIMON',
  requisitosEspeciales: 'Debe saber exprimir limones',
  uuidCiudad: 'c34d0ac0-c72a-42ff-91c3-76c665b60683',
  uuidEstado: 'ebaf090e-cd26-4ea1-9a26-2627bddcbbcb',
  uuidPais: 'aeded38f-56a5-4a49-874a-57231b57af28',
  uuidHabilidades: [
    'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    'e1ac286d-48be-416b-b241-9120c8fd7281',
  ],
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const empresaORM = getRepository(EmpresaORM)
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

  const empresa = empresaORM.create({
    uuid: '1069dfaf-4740-4a05-821e-c22f4538ae91',
    correo_electronico: 'orange@soft.com',
    nombre: 'OrangeSoft',
    estatus: 'ACTIVO',
    requisitos_especiales: 'Debe saber exprimir naranjas',
    token: 'rffrGmqBJAm^iVcJPISJ*Y0!patdYJUP6s#SH6@KMPN7vhbhOt',
  })
  await empresaORM.save(empresa)

  const habilidades = [
    habilidadORM.create({
      nombre: 'Python',
      categoria: 'Desarrollo',
      uuid: 'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    }),
    habilidadORM.create({
      nombre: 'C#',
      categoria: 'Desarrollo',
      uuid: '957c13dd-a70a-4466-a271-0c321340a3ed',
    }),
    habilidadORM.create({
      nombre: 'Jest',
      categoria: 'Testing',
      uuid: 'e1ac286d-48be-416b-b241-9120c8fd7281',
    }),
  ]
  await habilidadORM.save(habilidades)
}

describe('Aceptación - Core/Empleador: Actualizar el perfil de una empresa', () => {
  let app: INestApplication
  let http: HttpServer

  beforeAll(async () => {
    // Creamos la aplicacion o modulo de testing de Nest.js para poder realizar la prueba e2e
    const moduloTesting = await Test.createTestingModule({
      imports: [ModuloCoreEmpleador],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()
    http = app.getHttpServer()

    await insertarDatosRequeridosPrueba()
  })

  it('Deberia editar el perfil de una empresa con los datos provistos', () => {
    return request(http)
      .put('/api/empleador/perfil')
      .send(DATOS_PERFIL)
      .expect(HttpStatus.OK)
  })

  it('Deberia rechazar la edición del perfil debido a que la empresa no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.idUsuario = '0'
    return request(http)
      .put('/api/empleador/perfil')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        origen: 'EmpresaNoExiste',
        mensaje: 'La empresa no se encuentra registrada.',
      })
  })

  it('Deberia rechazar la edición del perfil debido a que la ciudad especificada no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.uuidCiudad = '0'
    return request(http)
      .put('/api/empleador/perfil')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        origen: 'CiudadNoExiste',
        mensaje: 'La ciudad especificada no se encuentra registrada.',
      })
  })

  it('Deberia rechazar la edición del perfil debido a que el país especificado no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.uuidPais = '0'
    return request(http)
      .put('/api/empleador/perfil')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        origen: 'PaisNoExiste',
        mensaje: 'El país especificado no se encuentra registrado.',
      })
  })

  it('Deberia rechazar la edición del perfil debido a que el nombre especificado tiene una longitud invalida', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.nombreEmpresa = 'a'
    return request(http)
      .put('/api/empleador/perfil')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        origen: 'LongitudInvalidaNombreEmpresa',
        mensaje:
          'El nombre de la empresa debe contener como mínimo 4 caracteres.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
