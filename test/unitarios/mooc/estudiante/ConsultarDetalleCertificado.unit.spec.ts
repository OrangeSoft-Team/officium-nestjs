import { ServicioConsultarDetalleCertificado } from "../../../../src/mooc/estudiante/aplicacion/servicios/ServicioConsultarDetalleCertificado"
import { RepositorioCertificados } from "../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCertificados"

jest.mock(
    '../../../../src/mooc/estudiante/infraestructura/adaptadores/RepositorioCertificados',
  )


describe('Unitario - Mooc/Empleado: Consultar Detalle Certificado', () => {
    let mockRepositorioCertificados: RepositorioCertificados
  
    let casoUso: ServicioConsultarDetalleCertificado
  
    beforeAll(() => {
        mockRepositorioCertificados =
        new RepositorioCertificados()


      casoUso = new ServicioConsultarDetalleCertificado(
        mockRepositorioCertificados,
      )
    })
  
    it('Debe desplegar detalle de un certificado', () => {
      const resultado = casoUso.ejecutar({uuidCertificado: 'ced7608e-5db6-464e-93d1-ab32f28e809e'})
  
      return resultado.then((res) => {
        expect(res.esExitoso).toBeTruthy()
        expect(res.valor).toStrictEqual(
          {
            uuid: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
            titulo: 'Matematica basica',
            fechaExpedicion: new Date('09-06-2000'),
            descripcion: 'Este certificado demuestra capacidades en el analisis de funciones'
        })
      })
    })
  })