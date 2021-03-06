import { IExcepcion } from "../../../../../comun/dominio/IExcepcion"

export class CursoNoExiste implements IExcepcion {
    public readonly origen = 'CursoNoExiste'
    public constructor(public readonly mensaje: string) {}
  
    public getError() {
      return {
        mensaje: this.mensaje,
        origen: this.origen,
      }
    }
  }