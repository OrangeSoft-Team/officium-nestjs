import { EstatusEstudiante } from "../values/estudiante/EstatusEstudiante";

export class ConsultarEstatusEstudiante{
    public static consultar(estatus: string): boolean{
        const estatusDominio = EstatusEstudiante.crear(estatus as any)
        return (estatusDominio.obtenerEstatus() == 'SUSPENDIDO')
    }
}