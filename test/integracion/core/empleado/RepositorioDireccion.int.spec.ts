import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { DireccionPersistenciaDTO } from '../../../../src/core/empleado/aplicacion/puertos/IRepositorioDirecciones'
import { RepositorioDirecciones } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioDirecciones'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

const DATOS_DIRECCION: DireccionPersistenciaDTO = {
  id: '53c876d7-aec1-4e82-a48b-656119fb76d8',
  calleUno: 'Av. Francisco de Miranda',
  calleDos: 'Res. Pacheco',
  codigoPostal: '1070',
  idCiudad: 'c34d0ac0-c72a-42ff-91c3-76c665b60683',
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

describe('Integración - Core/Empleado: Repositorio empleados', () => {
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
      entities: ['src/core/empleado/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos requeridos de prueba
    await insertarDatosRequeridosPrueba()

    // Instanciamos al repositorio a probar (Subject under testing)
    repositorioDirecciones = new RepositorioDirecciones()
  })

  it('Deberia crear una dirección con todos los datos especificados', () => {
    const comando = repositorioDirecciones.crear(DATOS_DIRECCION)

    return comando.then(async (res) => {
      expect(res).toBeUndefined()

      // Cambiar si en algun este repositorio tiene queries
      const direccion = await getRepository(DireccionORM).findOne({
        where: { uuid: DATOS_DIRECCION.id },
      })

      expect(direccion).toBeInstanceOf(DireccionORM)
      expect(direccion.uuid).toBe(DATOS_DIRECCION.id)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
