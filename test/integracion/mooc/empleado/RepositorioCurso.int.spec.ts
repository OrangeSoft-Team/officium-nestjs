import { ConfigModule } from '@nestjs/config'
import { Connection, createConnection, getRepository } from 'typeorm'
import { HabilidadORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Habilidad.orm'
import { CuestionarioORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Cuestionario.orm'
import { CursoORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Curso.orm'
import { LeccionORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Leccion.orm'
import { OpcionORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Opcion.orm'
import { PreguntaORM } from '../../../../src/mooc/estudiante/infraestructura/persistencia/Pregunta.orm'
import { RepositorioCursos } from '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCursos'


const insertarDatosRequeridosPrueba = async () => {

  const cuestionarioORM = getRepository(CuestionarioORM)
  const preguntaORM = getRepository(PreguntaORM)
  const cursoORM = getRepository(CursoORM)
  const habilidadORM = getRepository(HabilidadORM)
  const leccionORM = getRepository(LeccionORM)
  const opcionORM = getRepository(OpcionORM)


  const curso = cursoORM.create({
    uuid: 'ebaf050e-ca26-4ea1-9f26-2627bddcbbcb',
    titulo: 'Curso de heladeria',
    estatus: 'ACTIVO',
    escala_duracion: 'DIA',
    valor_duracion: 2,
    fecha_creacion: new Date('09-06-2020'),
    fecha_ultima_modificacion: new Date('09-06-2020'),
  })
  await cursoORM.save(curso)

  const cuestionario = cuestionarioORM.create({
    uuid: 'ebaf050e-cd26-4ea1-9f26-2627bddcbbcb',
    escala_duracion: 'HORA',
    valor_duracion: 2,
    intentos_permitidos: 4,
    curso,
  })
  await cuestionarioORM.save(cuestionario)
  
  const pregunta = preguntaORM.create({
    uuid: 'ebaf090e-cd26-4ea1-9f26-2627bddcbbcb',
    enunciado: 'Sabor favorito de helado de los estudiantes',
    tipo: 'seleccion simple',
    ponderacion: 10,
   cuestionario
  })
  await preguntaORM.save(pregunta)
  
  const leccion = leccionORM.create({
    uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
    titulo: 'Como el helado de fresa ha cambiado nuestro universo',
    descripcion: 'En esta leccion se analizara el helado de fresa y su importancia a lo largo de la historia',
    contenido: 'El helado de fresa, considerado por muchos el salvador de la humanidad, ha sido un componente indispensable de nuestra evolucion',
    curso,
  })
  await leccionORM.save(leccion)

  const habilidad = habilidadORM.create({
    uuid: 'aeaed3af-56a5-4a49-874a-57231b57af28',
    nombre: 'Preparar helado correctamente',
    categoria: 'Heladeria',
    curso,
  })
  await habilidadORM.save(habilidad)

 

  const opcion = opcionORM.create({
    uuid: 'aeded3af-56a5-4a49-874a-57231b57af28',
    valor: 'Helado de fresa',
    correcto: true,
    pregunta,
  })
  await opcionORM.save(opcion)
}

describe('Integración - mooc/Empleado: Listar cursos', () => {
  let conexionBD: Connection
  let repositorioCursos: RepositorioCursos

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
      entities: ['src/mooc/estudiante/infraestructura/persistencia/*'],
      synchronize: true,
      dropSchema: true,
    })

    // Insertamos datos requeridos de prueba
    await insertarDatosRequeridosPrueba()

    // Instanciamos al repositorio a probar (Subject under testing)
    repositorioCursos = new RepositorioCursos()
  })

  it('Deberia retornar listado de cursos', () => {
    const comando = repositorioCursos.listar()

    return comando.then(async (res) => {
        expect(res).toStrictEqual([
            {
              uuid: 'ebaf050e-ca26-4ea1-9f26-2627bddcbbcb',
              titulo: 'Curso de heladeria',
              estatus: 'ACTIVO',
              fechaCreacion: new Date('09-06-2020'),
            },
          ])
    })
  })

  afterAll(async () => {
    await conexionBD.close()
  })
})