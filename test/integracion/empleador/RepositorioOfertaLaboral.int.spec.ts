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
import { OfertaLaboralNoExiste } from '../../../src/empleador/aplicacion/excepciones/OfertaLaboralNoExiste'
import { OfertaLaboralYaExiste } from '../../../src/empleador/aplicacion/excepciones/OfertaLaboralYaExiste'
import { RepositorioOfertaLaboral } from '../../../src/empleador/infraestructura/adaptadores/RepositorioOfertaLaboral'

const oferta_prueba = {
  id: '7453dc15-7ff2-4c37-9455-de661a5275b1',
  titulo: 'Desarrollador en Python',
  fechaPublicacion: new Date('06-06-2020'),
  fechaModificacion: new Date('06-08-2020'),
  cargo: 'Desarrollador',
  sueldo: 50000,
  descripcion:
    'Se busca desarrollador en python moderno con amplios conocimientos en los principios SOLID.',
  duracionEstimada: 1,
  escalaDuracion: 'mes',
  turno: 'diurno',
  numeroVacantes: 1,
  estado: 'cancelado',
  idEmpresa: '38e33e61-c75c-4190-86ac-c77124381214',
}

const empresa_prueba = {
  uuid: '38e33e61-c75c-4190-86ac-c77124381214',
  codigoPostal: '1060',
  direccionCalle: 'Avenida testing',
  correoElectronico: 'testing@testing.com',
  nombre: 'Testing Inc.',
}

describe('Repositorio de persistencia Empleador: Ofertas Laborales', () => {
  let conexionBD: Connection
  let repositorioOfertaLaboral: RepositorioOfertaLaboral

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

    // Insertamos empresa de prueba
    await getRepository(EmpresaORM).insert(empresa_prueba)

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioOfertaLaboral = new RepositorioOfertaLaboral(
      getRepository(OfertaLaboralORM),
      getRepository(EmpresaORM),
    )
  })

  it('Debe registrar una nueva oferta laboral con los datos especificados', () => {
    const comando = repositorioOfertaLaboral.crear(oferta_prueba)

    return comando.then((res) => {
      expect(res).toBeUndefined()
      const query = repositorioOfertaLaboral.obtenerOferta({
        idEmpresa: '38e33e61-c75c-4190-86ac-c77124381214',
        idOfertaLaboral: '7453dc15-7ff2-4c37-9455-de661a5275b1',
      })
      return query.then((res) => {
        expect(res).toStrictEqual(oferta_prueba)
      })
    })
  })

  it('Debe rechazar el registro de una oferta laboral debido a que ya existe una con dichos identificadores', () => {
    const comando = repositorioOfertaLaboral.crear(oferta_prueba)

    return comando.catch((err) => {
      expect(err).toBeInstanceOf(OfertaLaboralYaExiste)
    })
  })

  it('Debe retornar un error de tipo OfertaLaboralNoExiste cuando se intenta obtener una oferta inexistente', () => {
    const query = repositorioOfertaLaboral.obtenerOferta({
      idEmpresa: '38e33e61-c75c-4190-86ac-c77124381214',
      idOfertaLaboral: 'noexiste-7ff2-4c37-9455-de661a5275b1',
    })

    return query.catch((err) => {
      expect(err).toBeInstanceOf(OfertaLaboralNoExiste)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
