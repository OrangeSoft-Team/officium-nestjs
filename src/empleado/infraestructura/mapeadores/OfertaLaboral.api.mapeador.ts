
import { MapeadorFecha } from "src/comun/infraestructura/mapeadores/Fecha.mapeador";
import { ConsultarOfertasLaboralesDTO } from "src/empleado/aplicacion/dto/ConsultarOfertasLaborales.dto";
import { VerDetallesOfertaLaboralPeticionDTO } from "src/empleado/aplicacion/dto/VerDetallesOfertaLaboral.dto";
import { ConsultarOfertasLaboralesAPIDTO } from "../dto/ConsultarOfertasLaborales.dto";

export class OfertaLaboralAPIMapeador {
    public static ConsultarOfertasRespuestaHttp(datos: ConsultarOfertasLaboralesDTO[],): ConsultarOfertasLaboralesAPIDTO[] {
            //Mapea la respuesta del caso de uso al formato que responde el API
            const http = []
            datos.forEach((oferta) =>
              http.push({
                uuid: oferta.id,
                titulo: oferta.titulo,
                fechaPublicacion: MapeadorFecha.formatear(oferta.fecha),
                cargo: oferta.cargo,
                sueldo: oferta.sueldo,
                duracionEstimadaValor: oferta.duracionEstimadaValor,
                duracionEstimadaEscala: oferta.duracionEstimadaEscala,
                turnoTrabajo: oferta.turnoTrabajo,
                numeroVacantes: oferta.numeroVacantes,
                empresaNombre: oferta.nombreEmpresa,
              }),
            )
            return http
    }

    public static VerDetallesOfertaPeticionHttp(uuid_oferta_laboral: string): VerDetallesOfertaLaboralPeticionDTO{
        return {idOferta: uuid_oferta_laboral }
    }

    public static VerDetallesOfertaRespuestaHttp(datos: ConsultarOfertasLaboralesDTO[],): ConsultarOfertasLaboralesAPIDTO[] {
      //Mapea la respuesta del caso de uso al formato que responde el API
      const http = []
      datos.forEach((oferta) =>
        http.push({
          uuid: oferta.id,
          titulo: oferta.titulo,
          fechaPublicacion: MapeadorFecha.formatear(oferta.fecha),
          cargo: oferta.cargo,
          sueldo: oferta.sueldo,
          duracionEstimadaValor: oferta.duracionEstimadaValor,
          duracionEstimadaEscala: oferta.duracionEstimadaEscala,
          turnoTrabajo: oferta.turnoTrabajo,
          numeroVacantes: oferta.numeroVacantes,
          empresaNombre: oferta.nombreEmpresa,
        }),
      )
      return http
}

}