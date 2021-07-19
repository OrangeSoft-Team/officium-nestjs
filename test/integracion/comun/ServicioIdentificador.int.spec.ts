import { ServicioIdentificador } from '../../../src/comun/infraestructura/adaptadores/ServicioIdentificador'

describe('Integración - Comun: Generar un identificador único utilizando el paquete UUID (NPM)', () => {
  let servicioIdentificador: ServicioIdentificador

  beforeAll(() => {
    servicioIdentificador = new ServicioIdentificador()
  })

  it('Deberia generar una UUID valida', () => {
    const resultado = servicioIdentificador.generarIdentificador()
    expect(typeof resultado).toBe('string')
    expect(resultado).toHaveLength(36)
  })
})
