import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IdentificadorDTO } from '../../aplicacion/dto/Identificador.dto'
import { ExcepcionAplicacion } from '../../aplicacion/ExcepcionAplicacion'
import {
  CiudadPersistenciaDTO,
  IRepositorioCiudades,
} from '../../aplicacion/puertos/IRepositorioCiudades'
import { CiudadORM } from '../persistencia/Ciudad.orm'
import { EstadoORM } from '../persistencia/Estado.orm'

@Injectable()
export class RepositorioCiudades implements IRepositorioCiudades {
  public constructor(
    @InjectRepository(EstadoORM)
    private readonly repositorioEstado: Repository<EstadoORM>,
    @InjectRepository(CiudadORM)
    private readonly repositorioCiudad: Repository<CiudadORM>,
  ) {}

  public async obtenerPorEstado(
    solicitud: IdentificadorDTO,
  ): Promise<CiudadPersistenciaDTO[]> {
    try {
      // Obtenemos al estado involucrado
      const estado = await this.repositorioEstado.findOne({
        where: { uuid: solicitud.id },
      })
      const ciudades = await this.repositorioCiudad.find({ where: { estado } })
      // retornamos las ciudades
      return ciudades.map((ciudad) => {
        return {
          idCiudad: ciudad.uuid,
          idEstado: estado.uuid,
          nombreCiudad: ciudad.nombre,
        }
      })
    } catch (error) {
      // En caso de que suceda algun error al obtener las ciudades
      throw new ExcepcionAplicacion(
        null,
        'No se ha podido obtener las ciudades del estado.',
      )
    }
  }
}
