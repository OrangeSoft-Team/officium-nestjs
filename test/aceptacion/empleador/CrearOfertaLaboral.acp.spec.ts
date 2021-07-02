import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../../../src/comun/infraestructura/app.module'
import { getRepository } from 'typeorm'
import { PaisORM } from '../../../src/comun/infraestructura/persistencia/Pais.orm'
import { EstadoORM } from '../../../src/comun/infraestructura/persistencia/Estado.orm'
import { CiudadORM } from '../../../src/comun/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../src/comun/infraestructura/persistencia/Direccion.orm'
import { EmpresaORM } from '../../../src/comun/infraestructura/persistencia/Empresa.orm'

// Mockeamos el inicializador de la aplicación para que este inicie con la base de datos de testing
jest.mock('../../../src/comun/infraestructura/app.module')

// Inserta en la base de datos los datos de prueba necesarios para el test de aceptación
// Nota: La base de datos de testing se borra cada vez que se inicia la prueba para aislar
// el test E2E de corridas anteriores
async function crearDatosPrueba() {
  let pais = new PaisORM()
  pais = {
    uuid: '3e4ab19c-ae50-440a-b40f-60f286c48873',
    nombre: 'Venezuela',
    estados: [],
  }
  await getRepository(PaisORM).insert(pais)

  let estado = new EstadoORM()
  estado = {
    uuid: '1f661ce5-7304-4e88-a1fb-a530f08b66d8',
    nombre: 'Distrito Capital',
    pais,
    ciudades: [],
  }
  await getRepository(EstadoORM).insert(estado)

  let ciudad = new CiudadORM()
  ciudad = {
    uuid: '6fec016a-2b02-41da-bde5-7ecf5f4f8932',
    nombre: 'Caracas',
    estado,
    direcciones: [],
  }
  await getRepository(CiudadORM).insert(ciudad)

  let direccion = new DireccionORM()
  direccion = {
    uuid: '26247b74-591a-4130-a834-e488a0d91b7e',
    calle: 'Avenida Francisco de Miranda',
    codigoPostal: '1060',
    ciudad,
    empleados: [],
    empresas: [],
  }
  await getRepository(DireccionORM).insert(direccion)

  let empresa = new EmpresaORM()
  empresa = {
    uuid: 'e9449828-4284-48b1-81d1-7a6280e409e0',
    correoElectronico: 'orange@soft.com',
    nombre: 'OrangeSoft',
    direccion,
    ofertasLaborales: [],
  }
  await getRepository(EmpresaORM).insert(empresa)
}

describe('Empleador: Crear una nueva oferta laboral para la empresa', () => {
  let app: INestApplication

  beforeAll(async () => {
    // Creamos la aplicacion o modulo de testing de Nest.js para poder realizar la prueba e2e
    const moduloTesting = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduloTesting.createNestApplication()
    await app.init()

    await crearDatosPrueba()
  })

  it('Deberia crear una oferta laboral con todos los datos validos', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo CREATED
    return request(app.getHttpServer())
      .post('/api/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: 'e9449828-4284-48b1-81d1-7a6280e409e0',
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
      .post('/api/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: 'noexiste-4284-48b1-81d1-7a6280e409e0',
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
        nombre: 'EmpresaNoExiste',
        error: 'La empresa no se encuentra registrada en el sistema.',
      })
  })

  it('Deberia retornar un error 400 debido a que se coloca un titulo muy corto', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo BAD_REQUEST
    return request(app.getHttpServer())
      .post('/api/empleador/ofertas_laborales')
      .send({
        uuidEmpresa: 'e9449828-4284-48b1-81d1-7a6280e409e0',
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
        nombre: 'LongitudInvalidaTituloOferta',
        error:
          'El titulo de la oferta laboral debe contener como mínimo 4 caracteres.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
