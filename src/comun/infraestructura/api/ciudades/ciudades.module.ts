import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CiudadORM } from '../../persistencia/Ciudad.orm'
import { EstadoORM } from '../../persistencia/Estado.orm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorCiudades } from './ciudades.controller'
import { ServicioCiudades } from './ciudades.service'

@Module({
  imports: [TypeOrmModule.forFeature([PaisORM, CiudadORM, EstadoORM])],
  controllers: [ControladorCiudades],
  providers: [ServicioCiudades],
})
export class ModuloCiudades {}
