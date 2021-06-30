import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExcepcionAplicacion } from 'src/comun/aplicacion/ExcepcionAplicacion'
import { OfertaLaboralORM } from 'src/comun/infraestructura/persistencia/OfertaLaboral.orm'
import { IRepositorioOfertaLaboral, OfertaLaboralPersistenciaDTO} from 'src/empleado/aplicacion/puertos/IRepositorioOfertaLaboral'
import { Repository } from 'typeorm'

@Injectable()
export class RepositorioOfertaLaboral implements IRepositorioOfertaLaboral{
    public constructor(   
     @InjectRepository(OfertaLaboralORM)
    private readonly repositorioOferta: Repository<OfertaLaboralORM>,){}
    
    public async listar(): Promise<OfertaLaboralPersistenciaDTO[]> {
        try{
            //Implementacion del repositorio, se hace el listado a persistencia
            const listadoOfertas = await this.repositorioOferta.createQueryBuilder()
            .select('OfertaLaboral').leftJoinAndSelect('OfertaLaboral.empresa','empresa')
            .getMany()
            return listadoOfertas.map((oferta) => {
                return {
                  id: oferta.uuid,
                  nombreEmpresa: oferta.empresa.nombre,
                  ...oferta,
                }
              })
        }catch(error){
          //En caso de alguna falla con la persistencia
          throw new ExcepcionAplicacion(
            null,
            'No se ha podido procesar la solicitud.',
          )
        }
    }
}