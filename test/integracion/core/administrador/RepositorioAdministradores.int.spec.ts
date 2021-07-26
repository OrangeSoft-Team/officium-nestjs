import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { AdministradorPersistenciaDTO } from '../../../../src/core/administrador/aplicacion/puertos/IRepositorioAdministradores'
import { RepositorioAdministradores } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioAdministradores'
import { AdministradorORM } from '../../../../src/core/administrador/infraestructura/persistencia/Administrador.orm'

const DATOS_ADMINISTRADOR: AdministradorPersistenciaDTO = {
  id: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  cargo: 'Gerente',
  primerApellido: 'Perez',
  primerNombre: 'José',
  correoElectronico: 'admin@officium.com',
  token: '9e8ae79a-298b-47d3-a399-4d9a2b1951fb',
}

const DATOS_EDITAR = {
  id: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  cargo: 'Supervisor',
  primerApellido: 'Perezoso',
  primerNombre: 'Josélito',
}

const insertarDatosRequeridosPrueba = async () => {
  const administradorORM = getRepository(AdministradorORM)

  const administrador = administradorORM.create({
    uuid: DATOS_ADMINISTRADOR.id,
    cargo: DATOS_ADMINISTRADOR.cargo,
    correo_electronico: DATOS_ADMINISTRADOR.correoElectronico,
    primer_apellido: DATOS_ADMINISTRADOR.primerApellido,
    primer_nombre: DATOS_ADMINISTRADOR.primerNombre,
    token: DATOS_ADMINISTRADOR.token,
  })
  await administradorORM.save(administrador)
}

describe('Integración - Core/Administrador: Repositorio de administradores', () => {
  let conexionBD: Connection
  let repositorioAdministradores: RepositorioAdministradores

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
      entities: ['src/core/administrador/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos requeridos de prueba
    await insertarDatosRequeridosPrueba()

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioAdministradores = new RepositorioAdministradores()
  })

  it('Deberia obtener el perfil del administrador con sus datos originales', () => {
    const query = repositorioAdministradores.obtenerPorId(
      DATOS_ADMINISTRADOR.id,
    )

    return query.then((res) => {
      expect(res).toStrictEqual({
        id: DATOS_ADMINISTRADOR.id,
        correoElectronico: DATOS_ADMINISTRADOR.correoElectronico,
        primerNombre: DATOS_ADMINISTRADOR.primerNombre,
        primerApellido: DATOS_ADMINISTRADOR.primerApellido,
        cargo: DATOS_ADMINISTRADOR.cargo,
      })
    })
  })

  it('Deberia editar el perfil del administrador con los datos especificados', () => {
    const comando = repositorioAdministradores.editar(DATOS_EDITAR)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener el perfil actualizado del administrador', () => {
    const query = repositorioAdministradores.obtenerPorId(
      DATOS_ADMINISTRADOR.id,
    )

    return query.then((res) => {
      expect(res).toStrictEqual({
        id: DATOS_ADMINISTRADOR.id,
        correoElectronico: DATOS_ADMINISTRADOR.correoElectronico,
        primerNombre: DATOS_EDITAR.primerNombre,
        primerApellido: DATOS_EDITAR.primerApellido,
        cargo: DATOS_EDITAR.cargo,
      })
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
