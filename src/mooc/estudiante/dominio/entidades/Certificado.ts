import { Entidad } from "../../../../comun/dominio/Entidad";
import { DescripcionCertificado } from "../values/certificado/DescripcionCertificado";
import { FechaExpedicionCertificado } from "../values/certificado/FechaExpedicionCertificado";
import { IdentificadorCertificado } from "../values/certificado/IdentificadorCertificado";

export interface DatosCertificado {
    identificador: IdentificadorCertificado
    fechaExpedicion: FechaExpedicionCertificado
    descripcion: DescripcionCertificado
}

export class Certificado extends Entidad {
    private constructor (
        private readonly identificador: IdentificadorCertificado,
        private readonly fechaExpedicion: FechaExpedicionCertificado,
        private readonly descripcion: DescripcionCertificado,
    ){
        super()
    }

    public obtenerIdentificador() {
        return this.identificador
      }
    
    public obtenerFechaExpedicion() {
        return this.fechaExpedicion
    }

    public obtenerDescripcion() {
        return this.descripcion
    }

    public esIgual(certificado: Certificado): boolean {
        return this.identificador.esIgual(certificado.obtenerIdentificador())
    }

    public static crear(datos: DatosCertificado): Certificado{
        return new Certificado(
            datos.identificador,
            datos.fechaExpedicion,
            datos.descripcion,
        )
    } 

    public static restaurar(datos: DatosCertificado): Certificado{
        return new Certificado(
            datos.identificador,
            datos.fechaExpedicion,
            datos.descripcion,
        )
    } 
}