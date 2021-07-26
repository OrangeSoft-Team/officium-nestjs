import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { RepositorioHabilidades } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioHabilidades'
import { EmpresaORM } from '../../../../src/core/empleador/infraestructura/persistencia/Empresa.orm'
import { HabilidadORM } from '../../../../src/core/empleador/infraestructura/persistencia/Habilidad.orm'

const HABILIDADES = [
  {
    nombre: 'Python',
    categoria: 'Desarrollo',
    id: 'ef1c6f23-e8c4-4e38-8f3b-d0bae1a8eadf',
  },
  {
    nombre: 'C#',
    categoria: 'Desarrollo',
    id: '957c13dd-a70a-4466-a271-0c321340a3ed',
  },
  {
    nombre: 'Jest',
    categoria: 'Testing',
    id: 'e1ac286d-48be-416b-b241-9120c8fd7281',
  },
]

const EMPRESA = {
  id: 'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
  correoElectronico: 'orange@soft.com',
  nombre: 'OrangeSoft',
  estatus: 'ACTIVO',
  requisitosEspeciales: 'Debe saber exprimir naranjas.',
  token: '$2b$10$aM8x6eZE4TfK/Tvx181KiuZUbRrBTHlguTTFomK6wzPRZG1FZ8vcO',
}

const insertarDatosRequeridosPrueba = async () => {
  const empresaORM = getRepository(EmpresaORM)
  const habilidadORM = getRepository(HabilidadORM)

  const empresa = empresaORM.create({
    uuid: EMPRESA.id,
    correo_electronico: EMPRESA.correoElectronico,
    requisitos_especiales: EMPRESA.requisitosEspeciales,
    ...EMPRESA,
  })
  await empresaORM.save(empresa)

  const habilidades = [
    habilidadORM.create({
      uuid: HABILIDADES[0].id,
      ...HABILIDADES[0],
    }),
    habilidadORM.create({
      uuid: HABILIDADES[1].id,
      ...HABILIDADES[1],
    }),
    habilidadORM.create({
      uuid: HABILIDADES[2].id,
      ...HABILIDADES[2],
    }),
  ]
  await habilidadORM.save(habilidades)
}

describe('Integración - Core/Empleador: Repositorio de habilidades', () => {
  let conexionBD: Connection
  let repositorioHabilidades: RepositorioHabilidades

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
    repositorioHabilidades = new RepositorioHabilidades()
  })

  it('Deberia retornar las habilidades especificadas por id', () => {
    const query = repositorioHabilidades.obtenerPorIdentificadores(
      HABILIDADES.map((hab) => hab.id),
    )

    return query.then((res) => {
      expect(res).toHaveLength(3)
    })
  })

  it('Deberia asignar las habilidades por id para la empresa', () => {
    const comando = repositorioHabilidades.guardarParaEmpresa(
      HABILIDADES,
      EMPRESA.id,
    )

    return comando.then((res) => {
      expect(res).toBeUndefined()
    })
  })

  it('Deberia obtener las habilidades a partir de la empresa especificada por id', () => {
    const query = repositorioHabilidades.obtenerPorIdEmpresa(
      'f0da6fb5-e9bf-4e38-987d-a4c638fb4ac5',
    )

    return query.then((res) => {
      expect(res).toHaveLength(3)
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})
