import { getRepository } from "typeorm";
import { IRepositorioEstudiantes } from "../../aplicacion/puertos/IRepositorioEstudiante";
import { EstudianteORM } from "../persistencia/Estudiante.orm";


export class RepositorioEstudiantes implements IRepositorioEstudiantes {
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