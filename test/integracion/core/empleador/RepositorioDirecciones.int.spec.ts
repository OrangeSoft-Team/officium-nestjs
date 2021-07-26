import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { DireccionPersistenciaDTO } from '../../../../src/core/empleador/aplicacion/puertos/IRepositorioDirecciones'
import { RepositorioDirecciones } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioDirecciones'
import { CiudadORM } from '../../../../src/core/empleador/infraestructura/persistencia/Ciudad.orm'
import { EstadoORM } from '../../../../src/core/empleador/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleador/infraestructura/persistencia/Pais.orm'

const DATOS_DIRECCION: DireccionPersistenciaDTO = {
  id: 'e1d5e11a-05fa-4bdb-9ec0-01edbd293e47',
  calleUno: 'Av. La Naranja Exprimida',
  calleDos: 'Edificio Tropicana',
  codigoPostal: 'TROPICO',
  idCiudad: 'c34d0ac0-c72a-42ff-91c3-76c665b60683',
  idEstado: 'ebaf090e-cd26-4ea1-9a26-2627bddcbbcb',
  idPais: 'aeded38f-56a5-4a49-874a-57231b57af28',
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)

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
}

describe('Integración - Core/Empleador: Repositorio de direcciones', () => {
  let conexionBD: Connection
  let repositorioDirecciones: RepositorioDirecciones

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
      entities: ['src/core/empleador/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos requeridos de prueba
    await insertarDatosRequeridosPrueba()

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioDirecciones = new RepositorioDirecciones()
  })

  it('Deberia verificar la existencia de un país', () => {
    const query = repositorioDirecciones.verificarPais(DATOS_DIRECCION.idPais)

    return query.then((res) => {
      expect(res).toBeTruthy()
    })
  })

  it('Deberia verificar la existencia de un estado', () => {
    const query = repositorioDirecciones.verificarEstado(
      DATOS_DIRECCION.idPais,
      DATOS_DIRECCION.idEstado,
    )

    return query.then((res) => {
      expect(res).toBeTruthy()
    })
  })

  it('Deberia verificar la existendia de una ciudad', () => {
    const query = repositorioDirecciones.verificarCiudad(
      DATOS_DIRECCION.idEstado,
      DATOS_DIRECCION.idCiudad,
    )

    return query.then((res) => {
      expect(res).toBeTruthy()
    })
  })

  it('Deberia crear una dirección con todos sus datos', () => {
    const comando = repositorioDirecciones.crear(DATOS_DIRECCION)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener los datos de la dirección previamente creada', () => {
    const query = repositorioDirecciones.obtenerPorId(DATOS_DIRECCION.id)

    return query.then((res) => {
      expect(res).toStrictEqual(DATOS_DIRECCION)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
