import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { DatosBasicosEmpresaPersistenciaDTO } from '../../../../src/core/empleador/aplicacion/puertos/IRepositorioEmpresas'
import { RepositorioEmpresas } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas'
import { CiudadORM } from '../../../../src/core/empleador/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleador/infraestructura/persistencia/Direccion.orm'
import { EmpresaORM } from '../../../../src/core/empleador/infraestructura/persistencia/Empresa.orm'
import { EstadoORM } from '../../../../src/core/empleador/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleador/infraestructura/persistencia/Pais.orm'

const DATOS_PERFIL: DatosBasicosEmpresaPersistenciaDTO = {
  id: 'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
  nombreEmpresa: 'LimonSoft',
  requisitosEspeciales: 'Debe saber exprimir limones.',
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const direccionORM = getRepository(DireccionORM)
  const empresaORM = getRepository(EmpresaORM)

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
    uuid: '0e59dfac-eb03-42cb-9e81-8b100192a1d9',
    calle_uno: 'Av. La Naranja Exprimida',
    calle_dos: 'Edificio Tropical',
    codigo_postal: 'ORANGE',
    ciudad,
  })
  await direccionORM.save(direccion)

  const empresa = empresaORM.create({
    uuid: 'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
    correo_electronico: 'orange@soft.com',
    nombre: 'OrangeSoft',
    estatus: 'ACTIVO',
    requisitos_especiales: 'Debe saber exprimir naranjas.',
    token: '$2b$10$aM8x6eZE4TfK/Tvx181KiuZUbRrBTHlguTTFomK6wzPRZG1FZ8vcO',
    direccion,
  })
  await empresaORM.save(empresa)
}

describe('Integración - Core/Empleador: Repositorio de empresas', () => {
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
      entities: ['src/core/empleador/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos requeridos de prueba
    await insertarDatosRequeridosPrueba()

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioEmpresas = new RepositorioEmpresas()
  })

  it('Deberia retornar los datos de una empresa previamente registrada', () => {
    const query = repositorioEmpresas.obtener(
      'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
    )
    return query.then((res) => {
      expect(res).toStrictEqual({
        id: 'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
        nombreEmpresa: 'OrangeSoft',
        requisitosEspeciales: 'Debe saber exprimir naranjas.',
        correoElectronico: 'orange@soft.com',
        estatus: 'ACTIVO',
        idDireccion: '0e59dfac-eb03-42cb-9e81-8b100192a1d9',
      })
    })
  })

  it('Deberia validar los datos de autentificación de la empresa previamente registrada', () => {
    const query = repositorioEmpresas.autentificar({
      correoElectronico: 'orange@soft.com',
      token: '9e8ae79a',
    })

    return query.then((res) => {
      expect(res.valido).toBeTruthy()
      expect(res.id).toBe('f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5')
      expect(res.nombreEmpresa).toBe('OrangeSoft')
    })
  })

  it('Deberia actualizar el perfil de la empresa previamente creada', () => {
    const comando = repositorioEmpresas.actualizarDatos(DATOS_PERFIL)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener el perfil de la empresa previamente actualizado', () => {
    const query = repositorioEmpresas.obtener(
      'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
    )
    return query.then((res) => {
      expect(res).toStrictEqual({
        ...DATOS_PERFIL,
        correoElectronico: 'orange@soft.com',
        estatus: 'ACTIVO',
        idDireccion: '0e59dfac-eb03-42cb-9e81-8b100192a1d9',
      })
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
