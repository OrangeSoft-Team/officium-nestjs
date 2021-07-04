import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RepositorioPostulaciones } from '../../adaptadores/RepositorioPostulaciones'
import { RepositorioEmpleado } from '../../adaptadores/RepositorioEmpleado'
import { ConsultarPostulacionesPeticionDTO } from '../../../aplicacion/dto/postulacion/ConsultarPostulaciones.dto'
import { ConsultarPostulaciones } from '../../../aplicacion/servicios/postulacion/ConsultarPostulaciones'
import { PostulacionOfertaORM } from '../../../../comun/infraestructura/persistencia/PostulacionOferta.orm'

@Injectable()
export class ServicioPostulaciones {
  private readonly repostiorioEmpleado: RepositorioEmpleado
  private readonly repositorioPostulaciones: RepositorioPostulaciones
  private readonly servicioConsultarPostulaciones: ConsultarPostulaciones

  public constructor(
    @InjectRepository(PostulacionOfertaORM)
    private readonly postulacionesORM: Repository<PostulacionOfertaORM>,
  ) {
    // generamos los adaptadores que debemos inyectar al caso de uso para que pueda funcionar
    this.repostiorioEmpleado = new RepositorioEmpleado()
    this.repositorioPostulaciones = new RepositorioPostulaciones()

    this.servicioConsultarPostulaciones = new ConsultarPostulaciones(
      this.repositorioPostulaciones,
      this.repostiorioEmpleado,
    )
  }

  public async ConsultarPostulaciones(dto: ConsultarPostulacionesPeticionDTO) {
    return await this.servicioConsultarPostulaciones.ejecutar(dto)
  }
}
