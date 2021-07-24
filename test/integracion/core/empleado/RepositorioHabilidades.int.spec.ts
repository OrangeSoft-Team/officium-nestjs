import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { RepositorioHabilidades } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioHabilidades'
import { CiudadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Ciudad.orm'
import { DireccionORM } from '../../../../src/core/empleado/infraestructura/persistencia/Direccion.orm'
import { EmpleadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Empleado.orm'
import { EstadoORM } from '../../../../src/core/empleado/infraestructura/persistencia/Estado.orm'
import { HabilidadORM } from '../../../../src/core/empleado/infraestructura/persistencia/Habilidad.orm'
import { PaisORM } from '../../../../src/core/empleado/infraestructura/persistencia/Pais.orm'

const DATOS_HABILIDADES = {
  idEmpleado: '0679466b-6198-4d4a-8d2b-bdfeea40c010',
  idHabilidades: [
    'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    '957c13dd-a70a-4466-a271-0c321340a3ed',
    'e1ac286d-48be-416b-b241-9120c8fd7281',
  ],
}

const insertarDatosRequeridosPrueba = async () => {
  const paisORM = getRepository(PaisORM)
  const estadoORM = getRepository(EstadoORM)
  const ciudadORM = getRepository(CiudadORM)
  const direccionORM = getRepository(DireccionORM)
  const empleadoORM = getRepository(EmpleadoORM)
  const habilidadORM = getRepository(HabilidadORM)

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

  const habilidades = [
    habilidadORM.create({
      uuid: 'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
    }),
    habilidadORM.create({
      uuid: '957c13dd-a70a-4466-a271-0c321340a3ed',
    }),
    habilidadORM.create({
      uuid: 'e1ac286d-48be-416b-b241-9120c8fd7281',
    }),
  ]
  await habilidadORM.save(habilidades)
}

describe('Integración - Core/Empleado: Repositorio habilidades', () => {
  let conexionBD: Connection
  let repositorioExperienciasLaborales: RepositorioHabilidades

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
    repositorioExperienciasLaborales = new RepositorioHabilidades()
  })

  it('Deberia actualizar las ofertas laborales del empleado', () => {
    const comando = repositorioExperienciasLaborales.actualizarPorIdEmpleado(
      DATOS_HABILIDADES.idEmpleado,
      DATOS_HABILIDADES.idHabilidades,
    )

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener los identificadores de todas las habilidades previamente actualizadas', () => {
    const query = repositorioExperienciasLaborales.obtenerPorIdEmpleado(
      DATOS_HABILIDADES.idEmpleado,
    )

    return query.then((res) => {
      expect(res.sort()).toMatchObject(DATOS_HABILIDADES.idHabilidades.sort())
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
