import { HttpServer, HttpStatus, INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { getRepository } from 'typeorm'
import { Auth } from '../../../../src/comun/infraestructura/dto/Auth.dto'
import { ModuloCoreEmpleado } from '../../../../src/core/empleado/infraestructura/api/core.empleado.module'
import { CrearExperienciaLaboralEmpleadoApiDTO } from '../../../../src/core/empleado/infraestructura/dto/CrearExperienciaLaboralEmpleado.api.dto'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EmpleadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Empleado.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

jest.mock(
  '../../../../src/core/empleado/infraestructura/api/core.empleado.module',
)

jest.mock('../../../../src/comun/infraestructura/middleware/sesion.middleware')

const DATOS_EXPERIENCIA: Auth<CrearExperienciaLaboralEmpleadoApiDTO> = {
  cargo: 'Asistente',
  nombreEmpresa: 'OrangeSoft',
  fechaFin: '16/06/2020',
  fechaInicio: '10/06/2020',
  idUsuario: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const direccionORM = getRepository(DireccionORM)
  const empleadoORM = getRepository(EmpleadoORM)

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
}

describe('Aceptación - Core/Empleado: Agregar experiencia laboral para un empleado', () => {
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

  it('Deberia agregar una experiencia laboral para el empleado', () => {
    return request(http)
      .post('/api/empleado/experiencias_laborales')
      .send(DATOS_EXPERIENCIA)
      .expect(HttpStatus.CREATED)
  })

  it('Deberia rechazar la creación de la experiencia laboral debido a que el empleado no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_EXPERIENCIA }
    DATOS_INVALIDOS.idUsuario = '1179466b-6198-4d4a-8d2b-bdfeea40c010'
    return request(http)
      .post('/api/empleado/experiencias_laborales')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.NOT_FOUND)
      .expect({
        mensaje: 'El empleado no se encuentra registrado.',
        origen: 'EmpleadoNoExiste',
      })
  })

  it('Deberia rechazar la creación de la experiencia laboral debido a que las fechas de la experiencia son invalidas', () => {
    const DATOS_INVALIDOS = { ...DATOS_EXPERIENCIA }
    DATOS_INVALIDOS.fechaInicio = '20/06/2020'
    DATOS_INVALIDOS.fechaFin = '16/06/2020'
    return request(http)
      .post('/api/empleado/experiencias_laborales')
      .send(DATOS_INVALIDOS)
      .expect(HttpStatus.BAD_REQUEST)
      .expect({
        mensaje:
          'La final de la experiencia laboral debe ser mayor a la fecha inicio.',
        origen: 'FechaFinNoMayorDeFechaInicioExperienciaLaboral',
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
