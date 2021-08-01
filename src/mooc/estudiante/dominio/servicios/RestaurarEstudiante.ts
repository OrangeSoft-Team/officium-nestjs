import { Estudiante } from "../entidades/Estudiante";
import { EstatusEstudiante } from "../values/estudiante/EstatusEstudiante";
import { IdentificadorEstudiante } from "../values/estudiante/IdentificadorEstudiante";

export class RestaurarEstudiante {
    public static restaurar(uuid: string, estatus: string): Estudiante{
        const uuidDominio = IdentificadorEstudiante.crear(uuid)
        const estatusDominio = EstatusEstudiante.crear(estatus as any)
        return Estudiante.restaurar(
            {
            identificador: uuidDominio,
            estatus: estatusDominio,
            }
        )
    }
}