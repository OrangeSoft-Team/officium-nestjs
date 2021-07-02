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
import { OfertaLaboralORM } from '../../../src/comun/infraestructura/persistencia/OfertaLaboral.orm'
import { EmpleadoORM } from '../../../src/comun/infraestructura/persistencia/Empleado.orm'

// Mockeamos el inicializador de la aplicación para que este inicie con la base de datos de testing
jest.mock('../../../src/comun/infraestructura/app.module')

// Inserta en la base de datos los datos de prueba necesarios para el test de aceptación
// Nota: La base de datos de testing se borra cada vez que se inicia la prueba para aislar
// el test E2E de corridas anteriores
async function crearDatosPrueba() {
  let pais = new PaisORM()
  pais = {
    uuid: '5409fjls-ae50-440a-b40f-60f286c48873',
    nombre: 'Ecuador',
    estados: [],
  }
  await getRepository(PaisORM).insert(pais)

  let estado = new EstadoORM()
  estado = {
    uuid: '1f661ce1-7304-4e88-a1fb-a530f08b66d8',
    nombre: 'Carchi',
    pais,
    ciudades: [],
  }
  await getRepository(EstadoORM).insert(estado)

  let ciudad = new CiudadORM()
  ciudad = {
    uuid: 'hiuhoiuh-2b02-41da-bde5-7ecf5f4f8932',
    nombre: 'Quito',
    estado,
    direcciones: [],
  }
  await getRepository(CiudadORM).insert(ciudad)

  let direccion = new DireccionORM()
  direccion = {
    uuid: '49595949-591a-4130-a834-e488a0d91b7e',
    calle: 'Avenida Ecuador',
    codigoPostal: '3000',
    ciudad,
    empleados: [],
    empresas: [],
  }
  await getRepository(DireccionORM).insert(direccion)

  let empresa = new EmpresaORM()
  empresa = {
    uuid: '25833848-4284-48b1-81d1-7a6280e409e0',
    correoElectronico: 'ecuador@soft.com',
    nombre: 'EcuadorSoft',
    direccion,
    ofertasLaborales: [],
  }
  await getRepository(EmpresaORM).insert(empresa)

  let empleado = new EmpleadoORM()
  empleado = {
    uuid: '97987987-a218-4e95-bc00-0d14fb543a21',
    genero: 'femenino',
    fechaNacimiento: new Date('06-19-1999'),
    direccion,
    numeroTelefonico: '+584748545216',
    primerApellido: 'Perez',
    primerNombre: 'Victoria',
    segundoApellido: null,
    segundoNombre: null,
    postulaciones: null,
  }
  await getRepository(EmpleadoORM).insert(empleado)

  let ofertaLaboral = new OfertaLaboralORM()
  ofertaLaboral = {
    uuid: '66664544-e815-412c-96f1-a6db3c14c2df',
    cargo: 'Personal de limpieza',
    descripcion: 'Se busca personal de limpieza con 1 año de experiencia.',
    duracionEstimada: 6,
    escalaDuracion: 'mes',
    estado: 'publicado',
    numeroVacantes: 1,
    sueldo: 1000,
    titulo: 'Personal de limpieza en Quito',
    turno: 'diurno',
    fechaPublicacion: new Date('09-15-2020'),
    fechaModificacion: null,
    empresa,
    postulaciones: null,
  }
  await getRepository(OfertaLaboralORM).insert(ofertaLaboral)
}

describe('Empleado: Postularse para una oferta laboral activa', () => {
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

  it('Deberia postular al empleado en la oferta laboral de una empresa con todos sus datos validos', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo CREATED
    return request(app.getHttpServer())
      .post(
        `/api/empleado/ofertas_laborales/${'66664544-e815-412c-96f1-a6db3c14c2df'}`,
      )
      .send({
        uuidEmpleado: '97987987-a218-4e95-bc00-0d14fb543a21',
        uuidEmpresa: '25833848-4284-48b1-81d1-7a6280e409e0',
      })
      .expect(HttpStatus.CREATED)
  })

  it('Deberia retornar un error 404 debido a que no existe la oferta especificada', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo NOT_FOUND
    return request(app.getHttpServer())
      .post(
        `/api/empleado/ofertas_laborales/${'noexiste-e815-412c-96f1-a6db3c14c2df'}`,
      )
      .send({
        uuidEmpleado: '97987987-a218-4e95-bc00-0d14fb543a21',
        uuidEmpresa: '25833848-4284-48b1-81d1-7a6280e409e0',
      })
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        nombre: 'OfertaLaboralNoExiste',
        error: 'La oferta laboral no se encuentra registrada.',
      })
  })

  it('Deberia retornar un error 404 debido a que no existe el empleado especificado', () => {
    // Realizamos solicitud al endpoint POST del caso de uso y esperamos un codigo BAD_REQUEST
    return request(app.getHttpServer())
      .post(
        `/api/empleado/ofertas_laborales/${'66664544-e815-412c-96f1-a6db3c14c2df'}`,
      )
      .send({
        uuidEmpleado: 'noexiste-a218-4e95-bc00-0d14fb543a21',
        uuidEmpresa: '25833848-4284-48b1-81d1-7a6280e409e0',
      })
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        nombre: 'EmpleadoNoExiste',
        error: 'El empleado no se encuentra registrado.',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
