import { IRepositorioLecciones, LeccionesCursoPersistenciaDTO, LeccionesPersistenciaDTO, LeccionPersistenciaDTO, VerLeccionPersistenciaDTO } from "../../../aplicacion/puertos/IRepositorioLecciones"


    const lecciones = [
        {
            uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
            titulo: 'Como el helado de fresa ha cambiado nuestro universo',
        },
    ]

    const leccion = {
        uuid: 'aefed3af-56a5-4a49-874a-57231b57af28',
        titulo: 'Como el helado de fresa ha cambiado nuestro universo',
        descripcion: 'En esta leccion se analizara el helado de fresa y su importancia a lo largo de la historia',
        contenido: 'El helado de fresa, considerado por muchos el salvador de la humanidad, ha sido un componente indispensable de nuestra evolucion',
    }

export class RepositorioLecciones implements IRepositorioLecciones {
    public async consultar(query: VerLeccionPersistenciaDTO): Promise<LeccionPersistenciaDTO> {
        return leccion
    }
    public async listar(query: LeccionesCursoPersistenciaDTO): Promise<LeccionesPersistenciaDTO[]> {
        return lecciones
    }
}