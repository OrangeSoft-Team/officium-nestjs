import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { DireccionORM } from './Direccion.orm'

@Entity('empleados')
export class EmpleadoORM {
  @PrimaryColumn({ type: 'uuid' })
  uuid: string

  @Column()
  primer_nombre: string

  @Column()
  primer_apellido: string

  @Column()
  correo_electronico: string

  @Column()
  telefono: string

  @Column()
  nivel_educativo:
    | 'NINGUNO'
    | 'PRIMARIA'
    | 'SECUNDARIA'
    | 'TECNICO'
    | 'PREGRADO'
    | 'POSTGRADO'
    | 'DOCTORADO'
    | 'MASTER'

  @Column()
  estatus: 'DISPONIBLE' | 'OCUPADO' | 'SUSPENDIDO'

  @Column()
  genero: 'MASCULINO' | 'FEMENINO' | 'OTRO'

  @Column()
  fecha_nacimiento: Date

  @Column()
  token: string

  @Column({ nullable: true })
  segundo_nombre: string

  @Column({ nullable: true })
  segundo_apellido: string

  @OneToOne(() => DireccionORM)
  @JoinColumn()
  direccion: DireccionORM
}
