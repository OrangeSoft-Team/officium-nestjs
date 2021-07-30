import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { EmpleadoPersistenciaDTO } from '../../../../src/core/administrador/aplicacion/puertos/IRepositorioEmpleados'
import { RepositorioEmpleados } from '../../../../src/core/administrador/infraestructura/adaptadores/RepositorioEmpleados'
import { EmpleadoORM } from '../../../../src/core/administrador/infraestructura/persistencia/Empleado.orm'

const EMPLEADOS: EmpleadoPersistenciaDTO[] = [
  {
    id: '2f887c8e-ec00-444c-9a47-89c9b5a32d18',
    correoElectronico: 'jose@gmail.com',
    estatus: 'ACTIVO',
    fechaNacimiento: new Date('06-15-1999'),
    genero: 'MASCULINO',
    primerApellido: 'Rivero',
    primerNombre: 'Jose',
    segundoApellido: 'Lopez',
    segundoNombre: 'Alejandro',
    idDireccion: null,
  },
  {
    id: '7f5b5de2-ed2a-4f69-bf55-2e3f0e27d7da',
    correoElectronico: 'maria@gmail.com',
    estatus: 'ACTIVO',
    fechaNacimiento: new Date('07-14-1998'),
    genero: 'ACTIVO',
    primerApellido: 'Gomez',
    primerNombre: 'Maria',
    segundoApellido: 'Colmenarez',
    segundoNombre: 'Andrea',
    idDireccion: null,
  },
]

const insertarDatosPrueba = async () => {
  const empleadoORM = getRepository(EmpleadoORM)

  await empleadoORM.save({
    uuid: EMPLEADOS[0].id,
    correo_electronico: EMPLEADOS[0].correoElectronico,
    estatus: EMPLEADOS[0].estatus,
    fecha_nacimiento: EMPLEADOS[0].fechaNacimiento,
    genero: EMPLEADOS[0].genero,
    primer_nombre: EMPLEADOS[0].primerNombre,
    primer_apellido: EMPLEADOS[0].primerApellido,
    segundo_nombre: EMPLEADOS[0].segundoNombre,
    segundo_apellido: EMPLEADOS[0].segundoApellido,
  })

  await empleadoORM.save({
    uuid: EMPLEADOS[1].id,
    correo_electronico: EMPLEADOS[1].correoElectronico,
    estatus: EMPLEADOS[1].estatus,
    fecha_nacimiento: EMPLEADOS[1].fechaNacimiento,
    genero: EMPLEADOS[1].genero,
    primer_nombre: EMPLEADOS[1].primerNombre,
    primer_apellido: EMPLEADOS[1].primerApellido,
    segundo_nombre: EMPLEADOS[1].segundoNombre,
    segundo_apellido: EMPLEADOS[1].segundoApellido,
  })
}

describe('Integración - Core/Administrador: Repositorio de empleados', () => {
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
      entities: ['src/core/administrador/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos de prueba
    await insertarDatosPrueba()

    // Instanciamos al repositorio a prubar (Subject under testing)
    repositorioEmpleados = new RepositorioEmpleados()
  })

  it('Deberia retornar un empleado con sus datos especificado por su id', () => {
    const query = repositorioEmpleados.obtenerPorId(EMPLEADOS[0].id)

    return query.then((res) => {
      expect(res).toStrictEqual(EMPLEADOS[0])
    })
  })

  it('Deberia retornar una lista con todos los empleados registrados', () => {
    const query = repositorioEmpleados.obtenerTodos()
    EMPLEADOS.forEach((emp) => delete emp.idDireccion)
    return query.then((res) => {
      expect(res).toStrictEqual(EMPLEADOS)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
