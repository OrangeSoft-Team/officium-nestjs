import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection } from 'typeorm'
import { EmpresaPersistenciaDTO } from '../../../../src/core/administrador/aplicacion/puertos/IRepositorioEmpresas'
import { RepositorioEmpresas } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpresas'

const EMPRESA: EmpresaPersistenciaDTO = {
  id: '28f40fe3-f86c-403b-ad5c-37e5b73aa8ab',
  correoElectronico: 'orange@soft.com',
  estatus: 'ACTIVO',
  nombre: 'OrangeSoft',
  requisitosEspeciales: 'Debe saber exprimir naranjas.',
  token: '468948694684',
}

describe('Integración - Core/Administrador: Repositorio de empresas', () => {
  let conexionBD: Connection
  let repositorioEmpresas: RepositorioEmpresas

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

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioEmpresas = new RepositorioEmpresas()
  })

  it('Deberia crear una empresa con los datos especificados', () => {
    const comando = repositorioEmpresas.crear(EMPRESA)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener un listado conteniendo la empresa previamente creada', () => {
    const query = repositorioEmpresas.obtenerTodas()

    return query.then((res) => {
      expect(res).toHaveLength(1)
      expect(res).toStrictEqual([
        {
          id: EMPRESA.id,
          correoElectronico: EMPRESA.correoElectronico,
          estatus: EMPRESA.estatus,
          nombre: EMPRESA.nombre,
          requisitosEspeciales: EMPRESA.requisitosEspeciales,
        },
      ])
    })
  })

  it('Deberia editar a la empresa con los datos especificados', () => {
    const comando = repositorioEmpresas.editar({
      ...EMPRESA,
      nombre: 'LimonSoft',
    })

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener a la empresa por id con los datos previamente editados', () => {
    const query = repositorioEmpresas.obtenerPorId(EMPRESA.id)

    return query.then((res) => {
      expect(res).toStrictEqual({
        id: EMPRESA.id,
        correoElectronico: EMPRESA.correoElectronico,
        estatus: EMPRESA.estatus,
        nombre: 'LimonSoft',
        requisitosEspeciales: EMPRESA.requisitosEspeciales,
      })
    })
  })

  it('Deberia verificar que la empresa previamente creada exista', () => {
    const query = repositorioEmpresas.existe(EMPRESA.correoElectronico)

    return query.then((res) => {
      expect(res).toBeTruthy()
    })
  })

  it('Deberia eliminar la empresa por id', () => {
    const comando = repositorioEmpresas.eliminar(EMPRESA.id)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia verificar que la empresa previamente elimina no exista', () => {
    const query = repositorioEmpresas.existe(EMPRESA.correoElectronico)

    return query.then((res) => {
      expect(res).toBeFalsy()
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
