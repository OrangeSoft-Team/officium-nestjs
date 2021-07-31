import { IRepositorioEstudiantes } from "../../../aplicacion/puertos/IRepositorioEstudiante";

export class RepositorioEstudiantes implements IRepositorioEstudiantes {
    public async existe(uuidEstudiante: string): Promise<boolean> {
        return true
    }

}