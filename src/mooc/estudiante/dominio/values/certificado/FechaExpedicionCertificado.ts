import { IValueObject } from "../../../../../comun/dominio/IValueObject";
import { FechaExpedicionCertificadoVacia, FechaExpedicionCertificadoInvalida } from "../../excepciones/certificado/FechaExpedicionCertificado.excepciones";

export class FechaExpedicionCertificado implements IValueObject {
    private constructor(private readonly fecha: Date){}
    public obtenerFecha() {
        return this.fecha
      }
    
    public esIgual(fechaExpedicion: FechaExpedicionCertificado): boolean {
        return this.fecha == fechaExpedicion.obtenerFecha()
    }

    public static crear(fecha: Date): FechaExpedicionCertificado{
        if (!fecha)
      throw new FechaExpedicionCertificadoVacia(
        'La fecha de creacion del curso no debe estar vacía.',
      )

    if (!(fecha instanceof Date))
      throw new FechaExpedicionCertificadoInvalida(
        'La fecha de creacion del curso no es una fecha valida.',
      )
    // si no hay errores
    return new FechaExpedicionCertificado(fecha)
  }
}