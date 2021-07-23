import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { ExperienciaLaboralPersitenciaDTO } from '../../../../src/core/empleado/aplicacion/puertos/IRepositorioExperienciasLaborales'
import { RepositorioExperienciasLaborales } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EmpleadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Empleado.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

const DATOS_EXPERIENCIA: ExperienciaLaboralPersitenciaDTO = {
  id: '4113058b-9c48-4bd8-a632-b277ea2b8027',
  cargo: 'Asistente',
  nombreEmpresa: 'OrangeSoft',
  fechaFin: new Date('06-06-2020'),
  fechaInicio: new Date('06-04-2020'),
  idEmpleado: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
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

describe('Integración - Core/Empleado: Repositorio experiencias laborales', () => {
  let conexionBD: Connection
  let repositorioExperienciasLaborales: RepositorioExperienciasLaborales

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
    repositorioExperienciasLaborales = new RepositorioExperienciasLaborales()
  })

  it('Deberia crear una experiencia laboral con todos los datos especificados', () => {
    const comando = repositorioExperienciasLaborales.crear(DATOS_EXPERIENCIA)

    return comando.then(async (res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener la experiencia laboral con los datos previamente creados', () => {
    const query = repositorioExperienciasLaborales.obtenerPorIdEmpleado(
      DATOS_EXPERIENCIA.idEmpleado,
    )

    return query.then((res) => {
      expect(res).toStrictEqual([
        {
          id: DATOS_EXPERIENCIA.id,
          cargo: DATOS_EXPERIENCIA.cargo,
          fechaInicio: DATOS_EXPERIENCIA.fechaInicio,
          fechaFin: DATOS_EXPERIENCIA.fechaFin,
          nombreEmpresa: DATOS_EXPERIENCIA.nombreEmpresa,
        },
      ])
    })
  })

  it('Deberia editar los dados de una experiencia laboral', () => {
    const DATOS_EDITADOS = { ...DATOS_EXPERIENCIA }
    DATOS_EDITADOS.cargo = 'Asistente II'
    DATOS_EDITADOS.nombreEmpresa = 'CitrusSoft'

    const comando = repositorioExperienciasLaborales.editar(DATOS_EDITADOS)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener la experiencia laboral con los datos previamente editados', () => {
    const DATOS_EDITADOS = { ...DATOS_EXPERIENCIA }
    DATOS_EDITADOS.cargo = 'Asistente II'
    DATOS_EDITADOS.nombreEmpresa = 'CitrusSoft'

    const query = repositorioExperienciasLaborales.obtenerPorIdEmpleado(
      DATOS_EDITADOS.idEmpleado,
    )

    return query.then((res) => {
      expect(res).toStrictEqual([
        {
          id: DATOS_EDITADOS.id,
          cargo: DATOS_EDITADOS.cargo,
          fechaInicio: DATOS_EDITADOS.fechaInicio,
          fechaFin: DATOS_EDITADOS.fechaFin,
          nombreEmpresa: DATOS_EDITADOS.nombreEmpresa,
        },
      ])
    })
  })

  it('Deberia eliminar la experiencia laboral previamente creada', () => {
    const comando = repositorioExperienciasLaborales.eliminar(
      DATOS_EXPERIENCIA.id,
      DATOS_EXPERIENCIA.idEmpleado,
    )

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('No deberia obtener la experiencia laboral previamente eliminada', () => {
    const query = repositorioExperienciasLaborales.obtenerPorIdEmpleado(
      DATOS_EXPERIENCIA.idEmpleado,
    )

    return query.then((res) => {
      expect(res).toHaveLength(0)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
