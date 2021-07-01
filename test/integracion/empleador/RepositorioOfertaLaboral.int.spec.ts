import {
  Connection,
  createConnection,
  getRepository,
  Repository,
} from 'typeorm'
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
  let ofertaLaboralORM: Repository<OfertaLaboralORM>
  let empresaORM: Repository<EmpresaORM>
  let repositorioOfertaLaboral: RepositorioOfertaLaboral

  beforeAll(async () => {
    // Generamos una conexión a la base de datos de testing
    conexionBD = await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'officium_test',
      entities: [
        OfertaLaboralORM,
        EmpresaORM,
        PostulacionOfertaORM,
        EmpleadoORM,
        DireccionORM,
        CiudadORM,
        EstadoORM,
        PaisORM,
      ],
      synchronize: true,
    })

    // Creamos los repositorios del ORM
    ofertaLaboralORM = getRepository(OfertaLaboralORM)
    empresaORM = getRepository(EmpresaORM)

    // Eliminamos datos de prueba anteriores
    await ofertaLaboralORM.delete('7453dc15-7ff2-4c37-9455-de661a5275b1')
    await empresaORM.delete('38e33e61-c75c-4190-86ac-c77124381214')

    // Insertamos empresa de prueba
    await empresaORM.insert(empresa_prueba)

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioOfertaLaboral = new RepositorioOfertaLaboral(
      ofertaLaboralORM,
      empresaORM,
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
