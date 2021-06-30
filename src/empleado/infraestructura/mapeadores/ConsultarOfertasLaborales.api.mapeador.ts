
import { MapeadorFecha } from "src/comun/infraestructura/mapeadores/Fecha.mapeador";
import { ConsultarOfertasLaboralesDTO } from "src/empleado/aplicacion/dto/ConsultarOfertasLaborales.dto";
import { ConsultarOfertasLaboralesAPIDTO } from "../dto/ConsultarOfertasLaborales.dto";

export class ConsultarOfertasLaboralesMapeador {
    public static respuestaHttp(datos: ConsultarOfertasLaboralesDTO[],): ConsultarOfertasLaboralesAPIDTO[] {
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