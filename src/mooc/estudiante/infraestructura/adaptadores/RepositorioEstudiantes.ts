import { getRepository } from "typeorm";
import { EstudiantePersistenciaDTO, IRepositorioEstudiantes } from "../../aplicacion/puertos/IRepositorioEstudiantes";
import { EstudianteORM } from "../persistencia/Estudiante.orm";


export class RepositorioEstudiantes implements IRepositorioEstudiantes {


    public async consultar(uuidEstudiante: string): Promise<EstudiantePersistenciaDTO> {
        try{
            const estudianteORM = getRepository(EstudianteORM)
            const estudiante = await estudianteORM.findOneOrFail({
                where: {uuid: uuidEstudiante}
            })
            return {
                uuidEstudiante: estudiante.uuid,
                estatus: estudiante.estatus,
            }
        }catch{}    
    }
    public async existe(uuidEstudiante: string): Promise<boolean> {
        try{
            const estudianteORM = getRepository(EstudianteORM)
            await estudianteORM.findOneOrFail({
                where: {uuid: uuidEstudiante}
            })
            return true
        }catch{
            return false
        }
    }


}