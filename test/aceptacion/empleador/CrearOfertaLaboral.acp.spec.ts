import * as request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../src/comun/infraestructura/app.module'

describe('Empleador: Crear una nueva oferta laboral para la empresa', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduloTesting = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()
  })

  it('Deberia crear una oferta laboral con todos los datos validos', () => {
    return request(app.getHttpServer())
      .post('/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: '1',
        titulo: 'Desarrollador en Python',
        cargo: 'Desarrollador',
        sueldo: 50000,
        descripcion:
          'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
        duracionEstimadaValor: 5,
        duracionEstimadaEscala: 'mes',
        turnoTrabajo: 'diurno',
        numeroVacantes: 1,
      })
      .expect(201)
  })

  it('Deberia retornar un error 404 debido a que no existe la empresa especificada', () => {
    return request(app.getHttpServer())
      .post('/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: '0',
        titulo: 'Desarrollador en Python',
        cargo: 'Desarrollador',
        sueldo: 50000,
        descripcion:
          'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
        duracionEstimadaValor: 5,
        duracionEstimadaEscala: 'mes',
        turnoTrabajo: 'diurno',
        numeroVacantes: 1,
      })
      .expect(404)
      .expect({
        codigo: 404,
        nombre: 'EmpresaNoExiste',
        error: 'La empresa no se encuentra registrada en el sistema.',
      })
  })

  it('Deberia retornar un error 400 debido a que se coloca un titulo muy corto', () => {
    return request(app.getHttpServer())
      .post('/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: '1',
        titulo: 'Des',
        cargo: 'Desarrollador',
        sueldo: 50000,
        descripcion:
          'Se busca desarrollador en python moderno que conozca la existencia de principios SOLID.',
        duracionEstimadaValor: 5,
        duracionEstimadaEscala: 'mes',
        turnoTrabajo: 'diurno',
        numeroVacantes: 1,
      })
      .expect(400)
      .expect({
        codigo: 400,
        nombre: 'LongitudInvalidaTituloOferta',
        error:
          'El titulo de la oferta laboral debe contener como mínimo 4 caracteres.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
