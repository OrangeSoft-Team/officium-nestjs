import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { EmpleadoPersistenciaDTO } from '../../../../src/core/empleado/aplicacion/puertos/IRepositorioEmpleados'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

const DATOS_EMPLEADO: EmpleadoPersistenciaDTO = {
  id: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  correoElectronico: 'carlosruiz@gmail.com',
  estatus: 'DISPONIBLE',
  genero: 'MASCULINO',
  nivelEducativo: 'SECUNDARIA',
  fechaNacimiento: new Date('01-31-1999'),
  telefono: '+584161234598',
  primerNombre: 'Carlos',
  primerApellido: 'Ruiz',
  segundoNombre: 'José',
  segundoApellido: 'Perez',
  token: '9e8ae79a-298b-47d3-a399-4d9a2b1951fb',
  idDireccion: '53c876d7-aec1-4e82-a48b-656119fb76d8',
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const direccionORM = getRepository(DireccionORM)

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
}

describe('Integración - Core/Empleado: Repositorio empleados', () => {
  let conexionBD: Connection
  let repositorioEmpleados: RepositorioEmpleados

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

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioEmpleados = new RepositorioEmpleados()
  })

  it('Deberia crear un empleado con todos los datos especificados', () => {
    const comando = repositorioEmpleados.crear(DATOS_EMPLEADO)

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia ubicar la existencia del empleado previamente creado', () => {
    const query = repositorioEmpleados.existe({
      correoElectronico: DATOS_EMPLEADO.correoElectronico,
    })

    return query.then((res) => {
      expect(res).toBeTruthy()
    })
  })

  it('Deberia validar los datos de autentificación del empleado previamente creado', () => {
    const query = repositorioEmpleados.autentificar({
      correoElectronico: DATOS_EMPLEADO.correoElectronico,
      token: DATOS_EMPLEADO.token,
    })

    return query.then((res) => {
      expect(res.valido).toBeTruthy()
      expect(res.id).toBe(DATOS_EMPLEADO.id)
    })
  })

  it('Deberia obtener los datos completos del empleado previamente creado', () => {
    const query = repositorioEmpleados.obtener(DATOS_EMPLEADO.id)

    return query.then((res) => {
      expect(res).toStrictEqual({
        id: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
        correoElectronico: 'carlosruiz@gmail.com',
        estatus: 'DISPONIBLE',
        genero: 'MASCULINO',
        nivelEducativo: 'SECUNDARIA',
        fechaNacimiento: new Date('01-31-1999'),
        telefono: '+584161234598',
        primerNombre: 'Carlos',
        primerApellido: 'Ruiz',
        segundoNombre: 'José',
        segundoApellido: 'Perez',
        idDireccion: '53c876d7-aec1-4e82-a48b-656119fb76d8',
      })
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
