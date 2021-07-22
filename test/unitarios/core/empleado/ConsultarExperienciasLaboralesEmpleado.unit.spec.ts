import { ServicioConsultarExperienciasLaboralesEmpleado } from '../../../../src/core/empleado/aplicacion/servicios/ServicioConsultarExperienciasLaboralesEmpleado'
import { EmpleadoNoExiste } from '../../../../src/core/empleado/dominio/excepciones/empleado/Empleado.excepciones'
import { RepositorioEmpleados } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados'
import { RepositorioExperienciasLaborales } from '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales'

// Mock: Repositorio Empleados
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioEmpleados',
)

// Mock: Repositorio Experiencias Laborales
jest.mock(
  '../../../../src/core/empleado/infraestructura/adaptadores/RepositorioExperienciasLaborales',
)

describe('Unitario - Core/Empleado: Consultar experiencias laborales para un empleado', () => {
  let mockRepositorioExperienciasLaborales: RepositorioExperienciasLaborales
  let mockRepositorioEmpleados: RepositorioEmpleados

  let casoUso: ServicioConsultarExperienciasLaboralesEmpleado

  beforeAll(() => {
    mockRepositorioExperienciasLaborales =
      new RepositorioExperienciasLaborales()
    mockRepositorioEmpleados = new RepositorioEmpleados()

    casoUso = new ServicioConsultarExperienciasLaboralesEmpleado(
      mockRepositorioExperienciasLaborales,
      mockRepositorioEmpleados,
    )
  })

  it('Debe desplegar todos las experiencias laborales de un empleado', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '1',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeTruthy()
      expect(res.valor).toStrictEqual([
        {
          id: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
          cargo: 'Asistente',
          nombreEmpresa: 'OrangeSoft',
          fechaInicio: new Date('06-06-1999'),
          fechaFin: new Date('09-06-1999'),
        },
      ])
    })
  })

  it('Debe rechazar la consulta debido a que el empleado no existe', () => {
    const resultado = casoUso.ejecutar({
      idEmpleado: '2',
    })

    return resultado.then((res) => {
      expect(res.esExitoso).toBeFalsy()
      expect(res.error).toBeInstanceOf(EmpleadoNoExiste)
    })
  })
})
