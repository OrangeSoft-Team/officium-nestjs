import { IdentificadorHabilidad } from '../../dominio/values/habilidad/IdentificadorHabilidad';

type ESCALA_VALORES = 'HORA' | 'DIA' | 'SEMANA' | 'MES'

export interface ConsultarCursoPersistenciaDTO {
  uuid: string
}

export interface HabilidadesRespuestaDTO {
  uuidHabilidad: IdentificadorHabilidad
}

export interface CursoPersistenciaDTO {
  uuid: string
  titulo: string
  valorDuracion: number
  escalaDuracion: ESCALA_VALORES
  habilidad: HabilidadesRespuestaDTO[]
  fechaUltimaModificacion?: Date
}

export interface IRepositorioCursos {
  crear(datos: CursoPersistenciaDTO): Promise<void>
  existe(TituloCurso: string): Promise<boolean>
}
