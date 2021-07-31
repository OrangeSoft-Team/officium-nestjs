import { IValueObject } from "../../../../../comun/dominio/IValueObject"
import { DescripcionCertificadoVacio, LongitudInvalidaDescripcionCertificado } from "../../excepciones/certificado/DescripcionCertificado.excepciones"


export class DescripcionCertificado implements IValueObject {
    private constructor(private readonly descripcion: string) {}
  
    public obtenerDescripcion() {
      return this.descripcion
    }
  
    public esIgual(descripcion: DescripcionCertificado): boolean {
      return this.descripcion == descripcion.obtenerDescripcion()
    }
  
    public static crear(descripcion: string): DescripcionCertificado {
      // No debe ser vacio
      if (descripcion == null || descripcion == undefined || descripcion == '')
        throw new DescripcionCertificadoVacio('La descripcion del certificado no puede estar vacio.')
      if (descripcion.length < 32)
        throw new LongitudInvalidaDescripcionCertificado(
          'El descripcion del certificado no puede ser menor a 16 caracteres',
        )
  
      if (descripcion.length > 512)
        throw new LongitudInvalidaDescripcionCertificado(
          'El descripcion del certificadono puede ser mayor a 16 caracteres',
        )
  
      // Si no hay errores
      return new DescripcionCertificado(descripcion)
    }
  }
  