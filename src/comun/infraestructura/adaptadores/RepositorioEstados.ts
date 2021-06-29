import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'
import {
  EstadoPersistenciaDTO,
  IRepositorioEstados,
} from '../../aplicacion/puertos/IRepositorioEstados'
import { EstadoORM } from '../persistencia/Estado.orm'
import { PaisORM } from '../persistencia/Pais.orm'

@Injectable()
export class RepositorioEstados implements IRepositorioEstados {
  public constructor(
    @InjectRepository(PaisORM)
    private readonly repositorioPais: Repository<PaisORM>,
    @InjectRepository(EstadoORM)
    private readonly repositorioEstado: Repository<EstadoORM>,
  ) {}

  public async obtenerPorPais(
    solicitud: IdentificadorDTO,
  ): Promise<EstadoPersistenciaDTO[]> {
    try {
      // Obtenemos al pais involucrado
      const pais = await this.repositorioPais.findOne({
        where: { uuid: solicitud.id },
      })
      const estados = await this.repositorioEstado.find({ where: { pais } })
      // retornamos las estados
      return estados.map((estado) => {
        return {
          idEstado: estado.uuid,
          idPais: pais.uuid,
          nombreEstado: estado.nombre,
        }
      })
    } catch (error) {
      // En caso de que suceda algun error al obtener los estados
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido obtener los estados del país.',
      )
    }
  }
}
