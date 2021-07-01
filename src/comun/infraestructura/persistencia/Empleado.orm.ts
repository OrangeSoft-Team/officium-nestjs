import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm'
import { DireccionORM } from './Direccion.orm'
import { PostulacionOfertaORM } from './PostulacionOferta.orm'

@Entity()
export class EmpleadoORM {
  @PrimaryColumn()
  uuid: string

  @Column()
  primerNombre: string

  @Column({ nullable: true })
  segundoNombre: string

  @Column()
  primerApellido: string

  @Column({ nullable: true })
  segundoApellido: string

  @Column()
  genero: string

  @Column()
  fechaNacimiento: Date

  @Column()
  numeroTelefonico: string

  @ManyToOne(() => DireccionORM, (direccion) => direccion.empleados)
  direccion: DireccionORM

  @OneToMany(() => PostulacionOfertaORM, (postulacion) => postulacion.empleado)
  postulaciones: PostulacionOfertaORM[]
}
