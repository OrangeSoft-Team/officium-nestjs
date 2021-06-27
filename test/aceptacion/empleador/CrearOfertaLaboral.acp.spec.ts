import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../src/comun/infraestructura/app.module'

describe('Empleador: Crear una nueva oferta laboral para la empresa', () => {
  let app: INestApplication

  beforeAll(async () => {
    // Creamos la aplicacion o modulo de testing de Nest.js para poder realizar la prueba e2e
    const moduloTesting = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()
  })

  it('Deberia crear una oferta laboral con todos los datos validos', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo CREATED
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
      .expect(HttpStatus.CREATED)
  })

  it('Deberia retornar un error 404 debido a que no existe la empresa especificada', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo NOT_FOUND
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
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        codigo: HttpStatus.NOT_FOUND,
        nombre: 'EmpresaNoExiste',
        error: 'La empresa no se encuentra registrada en el sistema.',
      })
  })

  it('Deberia retornar un error 400 debido a que se coloca un titulo muy corto', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo BAD_REQUEST
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
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        codigo: HttpStatus.BAD_REQUEST,
        nombre: 'LongitudInvalidaTituloOferta',
        error:
          'El titulo de la oferta laboral debe contener como mínimo 4 caracteres.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
