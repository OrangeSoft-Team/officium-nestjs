import { ServicioConsultarCertificadosEstudiante } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioConsultarCertificadosEstudiante"
import { RepositorioCertificados } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCertificados"
import { RepositorioEstudiantes } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes"

jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCertificados',
  )
  jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioEstudiantes',
  )


describe('Unitario - Mooc/Empleado: Consultar Certificados Empleado', () => {
    let mockRepositorioCertificados: RepositorioCertificados
    let mockRepositorioEstudiantes: RepositorioEstudiantes
  
    let casoUso: ServicioConsultarCertificadosEstudiante
  
    beforeAll(() => {
        mockRepositorioCertificados =
        new RepositorioCertificados()

        mockRepositorioEstudiantes = new RepositorioEstudiantes()

      casoUso = new ServicioConsultarCertificadosEstudiante(
        mockRepositorioCertificados,
        mockRepositorioEstudiantes
      )
    })
  
    it('Debe desplegar todos los certificados del empleado', () => {
      const resultado = casoUso.ejecutar({uuidEstudiante: 'ced7608e-5db6-464e-93d1-ab32f28e809e'})
  
      return resultado.then((res) => {
        expect(res.esExitoso).toBeTruthy()
        expect(res.valor).toStrictEqual([
          {
            uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
            titulo: 'Matematica basica',
            fechaExpedicion: new Date('09-06-2000'),
          },
        ])
      })
    })
  })