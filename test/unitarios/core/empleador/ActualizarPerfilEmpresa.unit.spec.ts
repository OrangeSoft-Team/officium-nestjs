import { BusEventos } from '../../../../src/comun/infraestructura/adaptadores/BusEventos'
import { ServicioIdentificador } from '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador'
import { ServicioEditarPerfilEmpresa } from '../../../../src/core/empleador/aplicacion/servicios/ServicioEditarPerfilEmpresa'
import { CiudadNoExiste } from '../../../../src/core/empleador/dominio/excepciones/ciudad/Ciudad.excepciones'
import { LongitudInvalidaCalleUnoDireccion } from '../../../../src/core/empleador/dominio/excepciones/direccion/CalleUnoDireccion.excepciones'
import { EmpresaNoExiste } from '../../../../src/core/empleador/dominio/excepciones/empresa/Empresa.excepciones'
import { PaisNoExiste } from '../../../../src/core/empleador/dominio/excepciones/pais/Pais.excepciones'
import { RepositorioDirecciones } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioDirecciones'
import { RepositorioEmpresas } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas'
import { RepositorioHabilidades } from '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioHabilidades'

const DATOS_PERFIL = {
  idEmpresa: '1',
  nombre: 'LimonSoft',
  requisitosEspeciales: '',
  calleUno: 'Av. El Limon Exprimido',
  calleDos: 'Edificio Limonada',
  codigoPostal: 'LIMON',
  idPais: '87bdfa74-ce5c-4e49-bd29-18c977cf2b7b',
  idEstado: 'ba1008db-3c4f-4613-bb5e-71b5c0d444f0',
  idCiudad: '2e079520-97f6-4851-b894-373fa15a1725',
  idHabilidades: [
    '844ea890-8980-4600-950e-c464bc204585',
    '35302768-e300-4038-a2ab-1c85870b7029',
  ],
}

jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioDirecciones',
)
jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioEmpresas',
)
jest.mock(
  '../../../../src/core/empleador/infraestructura/adaptadores/RepositorioHabilidades',
)
jest.mock(
  '../../../../src/comun/infraestructura/adaptadores/ServicioIdentificador',
)
jest.mock('../../../../src/comun/infraestructura/adaptadores/BusEventos')

describe('Unitario - Core/Empleador: Obtener perfil de la empresa', () => {
  let mockRepositorioEmpresas: RepositorioEmpresas
  let mockRepositorioDirecciones: RepositorioDirecciones
  let mockRepositorioHabilidades: RepositorioHabilidades
  let mockServicioIdentificador: ServicioIdentificador
  let mockBusEventos: BusEventos

  let casoUso: ServicioEditarPerfilEmpresa

  beforeAll(() => {
    mockRepositorioEmpresas = new RepositorioEmpresas()
    mockRepositorioDirecciones = new RepositorioDirecciones()
    mockRepositorioHabilidades = new RepositorioHabilidades()
    mockServicioIdentificador = new ServicioIdentificador()
    mockBusEventos = BusEventos.obtenerInstancia()

    casoUso = new ServicioEditarPerfilEmpresa(
      mockRepositorioEmpresas,
      mockRepositorioDirecciones,
      mockRepositorioHabilidades,
      mockServicioIdentificador,
      mockBusEventos,
    )

    jest.spyOn(mockBusEventos, 'publicar')
  })

  it('Deberia actualizar el perfil de la empresa con todos sus datos validos', () => {
    const resultado = casoUso.ejecutar(DATOS_PERFIL)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toBeNull()
      expect(mockBusEventos.publicar).toHaveBeenCalledWith([
        {
          fecha: expect.any(Date),
          nombre: 'PerfilEmpresaActualizado',
          datos: {
            idEmpresa: '1',
          },
        },
      ])
    })
  })

  it('Deberia rechazar la actualización del perfil debido a que la empresa no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.idEmpresa = '2'
    const resultado = casoUso.ejecutar(DATOS_INVALIDOS)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpresaNoExiste)
    })
  })

  it('Deberia rechazar la actualización del perfil debido a que la ciudad no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.idCiudad = '0'
    const resultado = casoUso.ejecutar(DATOS_INVALIDOS)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(CiudadNoExiste)
    })
  })

  it('Deberia rechazar la actualización del perfil debido a que el pais no existe', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.idPais = '0'
    const resultado = casoUso.ejecutar(DATOS_INVALIDOS)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(PaisNoExiste)
    })
  })

  it('Deberia rechazar la actualización del perfil debido a que la calle uno es muy corta', () => {
    const DATOS_INVALIDOS = { ...DATOS_PERFIL }
    DATOS_INVALIDOS.calleUno = 'A'
    const resultado = casoUso.ejecutar(DATOS_INVALIDOS)

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(LongitudInvalidaCalleUnoDireccion)
    })
  })
})
