import { GeneradorIdentificadorUUID } from '../../../src/comun/infraestructura/adaptadores/GeneradorIdentificadorUUID'

describe('Generador UUID: Generar un identificador único utilizando el paquete UUID (NPM)', () => {
  let generadorId: GeneradorIdentificadorUUID

  beforeEach(() => {
    generadorId = new GeneradorIdentificadorUUID()
  })

  it('Deberia generar una UUID valida', () => {
    const resultado = generadorId.generarIdentificador()
    expect(typeof resultado.id).toBe('string')
    expect(resultado.id).toHaveLength(36)
  })
})
