export interface IRepositorioEstudiantes {
    existe(uuidEstudiante: string): Promise<boolean>
}