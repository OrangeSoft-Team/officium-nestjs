import { EstudiantePersistenciaDTO, IRepositorioEstudiantes } from "../../../aplicacion/puertos/IRepositorioEstudiantes";


const estudiante = {
    uuidEstudiante: 'ced7608e-5db6-464e-93d1-ab32f28e809e',
    estatus: 'DISPONIBLE'
}

export class RepositorioEstudiantes implements IRepositorioEstudiantes {
    public async consultar(uuidEstudiante: string): Promise<EstudiantePersistenciaDTO> {
        return estudiante
    }
    public async existe(uuidEstudiante: string): Promise<boolean> {
        return true
    }

}