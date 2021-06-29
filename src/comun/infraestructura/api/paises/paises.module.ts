import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PaisORM } from '../../persistencia/Pais.orm'
import { ControladorPaises } from './paises.controller'
import { ServicioPaises } from './paises.service'

@Module({
  imports: [TypeOrmModule.forFeature([PaisORM])],
  controllers: [ControladorPaises],
  providers: [ServicioPaises],
})
export class ModuloPaises {}
