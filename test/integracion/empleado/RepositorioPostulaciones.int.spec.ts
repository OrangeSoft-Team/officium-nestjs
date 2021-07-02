import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { CiudadORM } from '../../../src/comun/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../src/comun/infraestructura/persistencia/Direccion.orm'
import { EmpleadoORM } from '../../../src/comun/infraestructura/persistencia/Empleado.orm'
import { EmpresaORM } from '../../../src/comun/infraestructura/persistencia/Empresa.orm'
import { EstadoORM } from '../../../src/comun/infraestructura/persistencia/Estado.orm'
import { OfertaLaboralORM } from '../../../src/comun/infraestructura/persistencia/OfertaLaboral.orm'
import { PaisORM } from '../../../src/comun/infraestructura/persistencia/Pais.orm'
import { PostulacionOfertaORM } from '../../../src/comun/infraestructura/persistencia/PostulacionOferta.orm'
import { EmpleadoNoExiste } from '../../../src/empleado/aplicacion/excepciones/EmpleadoNoExiste'
import { OfertaLaboralNoExiste } from '../../../src/empleado/aplicacion/excepciones/OfertaLaboralNoExiste'
import { RepositorioPostulaciones } from '../../../src/empleado/infraestructura/adaptadores/RepositorioPostulaciones'

// Inserta en la base de datos los datos de prueba necesarios para el test unitario
// Nota: La base de datos de testing se borra cada vez que se inicia la prueba para aislar
// el test de corridas anteriores
async function crearDatosPrueba() {
  let pais = new PaisORM()
  pais = {
    uuid: '3e4ab19b-ae50-440a-b40f-60f286c48873',
    nombre: 'Colombia',
    estados: [],
  }
  await getRepository(PaisORM).insert(pais)

  let estado = new EstadoORM()
  estado = {
    uuid: '1f661ce1-7304-4e88-a1fb-a530f08b66d8',
    nombre: 'Arauca',
    pais,
    ciudades: [],
  }
  await getRepository(EstadoORM).insert(estado)

  let ciudad = new CiudadORM()
  ciudad = {
    uuid: '6fec01ha-2b02-41da-bde5-7ecf5f4f8932',
    nombre: 'Cali',
    estado,
    direcciones: [],
  }
  await getRepository(CiudadORM).insert(ciudad)

  let direccion = new DireccionORM()
  direccion = {
    uuid: '26247h74-591a-4130-a834-e488a0d91b7e',
    calle: 'Avenida Cali',
    codigoPostal: '2000',
    ciudad,
    empleados: [],
    empresas: [],
  }
  await getRepository(DireccionORM).insert(direccion)

  let empresa = new EmpresaORM()
  empresa = {
    uuid: 'e9449h28-4284-48b1-81d1-7a6280e409e0',
    correoElectronico: 'orange@soft.com',
    nombre: 'OrangeSoft',
    direccion,
    ofertasLaborales: [],
  }
  await getRepository(EmpresaORM).insert(empresa)

  let empleado = new EmpleadoORM()
  empleado = {
    uuid: 'f64d2cd8-a218-4e95-bc00-0d14fb543a21',
    genero: 'masculino',
    fechaNacimiento: new Date('06-16-1999'),
    direccion,
    numeroTelefonico: '+584748545216',
    primerApellido: 'Perez',
    primerNombre: 'Carlos',
    segundoApellido: null,
    segundoNombre: null,
    postulaciones: null,
  }
  await getRepository(EmpleadoORM).insert(empleado)

  let ofertaLaboral = new OfertaLaboralORM()
  ofertaLaboral = {
    uuid: '1f85d6d6-e815-412c-96f1-a6db3c14c2df',
    cargo: 'Personal de limpieza',
    descripcion: 'Se busca personal de limpieza con 1 año de experiencia.',
    duracionEstimada: 6,
    escalaDuracion: 'mes',
    estado: 'publicado',
    numeroVacantes: 1,
    sueldo: 1000,
    titulo: 'Personal de limpieza en Cali',
    turno: 'diurno',
    fechaPublicacion: new Date('09-15-2020'),
    fechaModificacion: null,
    empresa,
    postulaciones: null,
  }
  await getRepository(OfertaLaboralORM).insert(ofertaLaboral)
}

describe('Repositorio de persistencia Empleado: Postulaciones', () => {
  let conexionBD: Connection
  let repositorioPostulaciones: RepositorioPostulaciones

  beforeAll(async () => {
    // Configuramos para que las variables de entorno se encuentren disponibles
    ConfigModule.forRoot()
    // Generamos una conexión a la base de datos de testing
    conexionBD = await createConnection({
      type: <any>process.env.TIPO_BD_TESTING,
      host: process.env.RUTA_BD_TESTING,
      port: parseInt(process.env.PUERTO_BD_TESTING),
      username: process.env.USUARIO_BD_TESTING,
      password: process.env.CLAVE_BD_TESTING,
      database: process.env.NOMBRE_BD_TESTING,
      synchronize: true,
      dropSchema: true,
      entities: [
        PaisORM,
        CiudadORM,
        EstadoORM,
        DireccionORM,
        EmpleadoORM,
        PostulacionOfertaORM,
        OfertaLaboralORM,
        EmpresaORM,
      ],
    })

    // Insertamos empresa, empleado y oferta de prueba
    await crearDatosPrueba()

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioPostulaciones = new RepositorioPostulaciones()
  })

  it('Debe guardar la postulación para la oferta laboral con todos los datos validos', () => {
    const comando = repositorioPostulaciones.crear({
      id: '6bc8af67-3667-4f7e-8398-3afd8dab1018',
      idOferta: '1f85d6d6-e815-412c-96f1-a6db3c14c2df',
      idEmpleado: 'f64d2cd8-a218-4e95-bc00-0d14fb543a21',
      estado: 'en proceso',
      fecha: new Date('07-01-2021'),
      comentario:
        'Estoy dispuesto a tomar el trabajo siempre y cuando comience luego de las 9 AM.',
    })

    return comando.then(() => {
      const query = getRepository(PostulacionOfertaORM).findOneOrFail({
        where: { uuid: '6bc8af67-3667-4f7e-8398-3afd8dab1018' },
      })
      return query.then((res) => {
        expect(res).toBeInstanceOf(PostulacionOfertaORM)
      })
    })
  })

  it('Debe rechazar el guardado de la postulación para la oferta laboral debido a que la oferta no existe', () => {
    const comando = repositorioPostulaciones.crear({
      id: '6bc8af67-3667-4f7e-8398-3afd8dab1018',
      idOferta: 'noexiste-e815-412c-96f1-a6db3c14c2df',
      idEmpleado: 'f64d2cd8-a218-4e95-bc00-0d14fb543a21',
      estado: 'en proceso',
      fecha: new Date('07-01-2021'),
      comentario:
        'Estoy dispuesto a tomar el trabajo siempre y cuando comience luego de las 9 AM.',
    })

    return comando.catch((err) => {
      expect(err).toBeInstanceOf(OfertaLaboralNoExiste)
    })
  })

  it('Debe rechazar el guardado de la postulación para la oferta laboral debido a que el empleado no existe', () => {
    const comando = repositorioPostulaciones.crear({
      id: '6bc8af67-3667-4f7e-8398-3afd8dab1018',
      idOferta: '1f85d6d6-e815-412c-96f1-a6db3c14c2df',
      idEmpleado: 'noexiste-a218-4e95-bc00-0d14fb543a21',
      estado: 'en proceso',
      fecha: new Date('07-01-2021'),
      comentario:
        'Estoy dispuesto a tomar el trabajo siempre y cuando comience luego de las 9 AM.',
    })

    return comando.catch((err) => {
      expect(err).toBeInstanceOf(EmpleadoNoExiste)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
