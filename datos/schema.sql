CREATE TABLE paises (
  uuid UUID NOT NULL,
  nombre VARCHAR(128) NOT NULL,
  CONSTRAINT pais_pk PRIMARY KEY(uuid)
);

CREATE TABLE estados (
  uuid UUID NOT NULL,
  nombre VARCHAR(128) NOT NULL,
  uuid_pais UUID NOT NULL,
  CONSTRAINT estado_pk PRIMARY KEY(uuid),
  CONSTRAINT pais_estado_fk FOREIGN KEY(uuid_pais) REFERENCES paises(uuid)
);

CREATE TABLE ciudades (
  uuid UUID NOT NULL,
  nombre VARCHAR(128) NOT NULL,
  uuid_estado UUID NOT NULL,
  CONSTRAINT ciudad_pk PRIMARY KEY(uuid),
  CONSTRAINT estado_ciudad_fk FOREIGN KEY(uuid_estado) REFERENCES estados(uuid)
);

CREATE TABLE direcciones (
  uuid UUID NOT NULL,
  calle_uno VARCHAR(128) NOT NULL,
  codigo_postal VARCHAR(10) NOT NULL,
  uuid_ciudad UUID NOT NULL,
  calle_dos VARCHAR(128),
  CONSTRAINT direccion_pk PRIMARY KEY(uuid),
  CONSTRAINT ciudad_direccio_fk FOREIGN KEY(uuid_ciudad) REFERENCES ciudades(uuid)
);

CREATE TABLE empleados (
  uuid UUID NOT NULL,
  primer_nombre VARCHAR(40) NOT NULL,
  primer_apellido VARCHAR(40) NOT NULL,
  correo_electronico VARCHAR(320) NOT NULL UNIQUE,
  telefono VARCHAR(16) NOT NULL,
  nivel_educativo VARCHAR(10) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  genero VARCHAR(10) NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  token VARCHAR NOT NULL,
  uuid_direccion UUID NOT NULL,
  segundo_nombre VARCHAR(40),
  segundo_apellido VARCHAR(40),
  CONSTRAINT empleado_pk PRIMARY KEY(uuid),
  CONSTRAINT direccion_empleado_fk FOREIGN KEY(uuid_direccion) REFERENCES direcciones(uuid),
  CONSTRAINT nivel_educativo_empleado CHECK(nivel_educativo IN ('NINGUNO', 'PRIMARIA', 'SECUNDARIA', 'TECNICO', 'PREGRADO', 'POSTGRADO', 'DOCTORADO', 'MASTER')),
  CONSTRAINT estatus_empleado CHECK(estatus IN ('DISPONIBLE', 'OCUPADO', 'SUSPENDIDO')),
  CONSTRAINT genero_empleado CHECK(genero IN ('MASCULINO', 'FEMENINO', 'OTRO'))
);

CREATE TABLE referencias (
  uuid UUID NOT NULL,
  primer_nombre VARCHAR(40) NOT NULL,
  primer_apellido VARCHAR(40) NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  nombre_empresa VARCHAR(128) NOT NULL,
  telefono VARCHAR(16) NOT NULL,
  correo_electronico VARCHAR(320) NOT NULL,
  uuid_empleado UUID NOT NULL,
  segundo_nombre VARCHAR(40),
  segundo_apellido VARCHAR(40),
  CONSTRAINT referencia_pk PRIMARY KEY(uuid),
  CONSTRAINT empleado_referencia_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid)
);

CREATE TABLE experiencias_laborales (
  uuid UUID NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  nombre_empresa VARCHAR(128) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  uuid_empleado UUID NOT NULL,
  CONSTRAINT experiencia_pk PRIMARY KEY(uuid),
  CONSTRAINT empleado_experiencia_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid)
);

CREATE TABLE empresas (
  uuid UUID NOT NULL,
  nombre VARCHAR(128) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  correo_electronico VARCHAR(320) NOT NULL UNIQUE,
  token VARCHAR NOT NULL,
  uuid_direccion UUID,
  requisitos_especiales VARCHAR(256),
  CONSTRAINT empresa_pk PRIMARY KEY(uuid),
  CONSTRAINT direccion_empresa_fk FOREIGN KEY(uuid_direccion) REFERENCES direcciones(uuid)
);

CREATE TABLE contactos (
  uuid UUID NOT NULL,
  primer_nombre VARCHAR(40) NOT NULL,
  primer_apellido VARCHAR(40) NOT NULL,
  correo_electronico VARCHAR(320) NOT NULL,
  telefono VARCHAR(16) NOT NULL,
  genero VARCHAR(10) NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  uuid_empresa UUID NOT NULL,
  segundo_nombre VARCHAR(40),
  segundo_apellido VARCHAR(40),
  CONSTRAINT contacto_pk PRIMARY KEY(uuid),
  CONSTRAINT empresa_contacto_fk FOREIGN KEY(uuid_empresa) REFERENCES empresas(uuid),
  CONSTRAINT genero_contacto CHECK(genero IN ('MASCULINO', 'FEMENINO', 'OTRO'))
);

CREATE TABLE habilidades (
  uuid UUID NOT NULL,
  nombre VARCHAR(64) NOT NULL UNIQUE,
  categoria VARCHAR(64) NOT NULL,
  CONSTRAINT habilidad_pk PRIMARY KEY(uuid)
);

CREATE TABLE personales_administrativos (
  uuid UUID NOT NULL,
  primer_nombre VARCHAR(40) NOT NULL,
  primer_apellido VARCHAR(40) NOT NULL,
  correo_electronico VARCHAR(320) NOT NULL UNIQUE,
  cargo VARCHAR(40) NOT NULL,
  token VARCHAR NOT NULL,
  CONSTRAINT admin_pk PRIMARY KEY(uuid)
);

CREATE TABLE ofertas_laborales (
  uuid UUID NOT NULL,
  titulo VARCHAR(80) NOT NULL,
  fecha_publicacion DATE NOT NULL,
  fecha_limite DATE NOT NULL,
  cargo VARCHAR(40) NOT NULL,
  sueldo NUMERIC(9,2) NOT NULL,
  descripcion VARCHAR(512) NOT NULL,
  valor_duracion NUMERIC(2,0) NOT NULL,
  escala_duracion VARCHAR(10) NOT NULL,
  turno_trabajo VARCHAR(10) NOT NULL,
  numero_vacantes NUMERIC(2,0) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  uuid_empresa UUID NOT NULL,
  fecha_ultima_modificacion DATE,
  requisitos_especiales VARCHAR(256),
  CONSTRAINT oferta_pk PRIMARY KEY(uuid),
  CONSTRAINT empresa_oferta_pk FOREIGN KEY(uuid_empresa) REFERENCES empresas(uuid),
  CONSTRAINT escala_duracion_oferta CHECK(escala_duracion IN ('HORA', 'DIA', 'SEMANA', 'MES')),
  CONSTRAINT turno_oferta CHECK(turno_trabajo IN ('DIURNO', 'NOCTURNO', 'MIXTO')),
  CONSTRAINT estatus_oferta CHECK(estatus IN ('PUBLICADO','CANCELADO','CERRADO'))
);

CREATE TABLE postulaciones_ofertas_laborales (
  uuid UUID NOT NULL,
  fecha_postulacion DATE NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  uuid_oferta UUID NOT NULL,
  uuid_empleado UUID NOT NULL,
  comentario VARCHAR(256),
  CONSTRAINT postulacion_pk PRIMARY KEY(uuid),
  CONSTRAINT oferta_postulacion_fk FOREIGN KEY(uuid_oferta) REFERENCES ofertas_laborales(uuid),
  CONSTRAINT empleado_postulacion_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid),
  CONSTRAINT estatus_postulacion CHECK(estatus IN ('APROBADA','RECHAZADA', 'EN PROCESO'))
);

CREATE TABLE trabajos (
  uuid UUID NOT NULL,
  fecha_inicio DATE NOT NULL,
  estatus VARCHAR(11) NOT NULL,
  uuid_postulacion UUID NOT NULL,
  fecha_culminacion DATE,
  CONSTRAINT trabajo_pk PRIMARY KEY(uuid),
  CONSTRAINT postulacion_trabajo_fk FOREIGN KEY(uuid_postulacion) REFERENCES postulaciones_ofertas_laborales(uuid),
  CONSTRAINT estatus_trabajo CHECK(estatus IN ('EN PROGRESO', 'CULMINADO', 'DESPEDIDO', 'RETIRADO'))
);

CREATE TABLE entrevistas (
  uuid UUID NOT NULL,
  fecha_pautada DATE NOT NULL,
  asunto VARCHAR(128) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  uuid_postulacion UUID NOT NULL,
  uuid_admin UUID NOT NULL,
  vinculo VARCHAR,
  CONSTRAINT entrevista_pk PRIMARY KEY(uuid),
  CONSTRAINT postulacion_entrevista_pk FOREIGN KEY(uuid_postulacion) REFERENCES postulaciones_ofertas_laborales(uuid),
  CONSTRAINT admin_entrevista_pk FOREIGN KEY(uuid_admin) REFERENCES personales_administrativos(uuid),
  CONSTRAINT estatus_entrevista CHECK(estatus IN ('PROPUESTA', 'ACEPTADA', 'RECHAZADA'))
);

CREATE TABLE cursos (
  uuid UUID NOT NULL,
  titulo VARCHAR(80) NOT NULL,
  estatus VARCHAR(10) NOT NULL,
  valor_duracion NUMERIC(2,0) NOT NULL,
  escala_duracion VARCHAR(10) NOT NULL,
  fecha_creacion DATE NOT NULL,
  fecha_ultima_modificacion DATE,
  CONSTRAINT curso_pk PRIMARY KEY(uuid),
  CONSTRAINT estatus_curso CHECK(estatus IN ('ACTIVO', 'INACTIVO')),
  CONSTRAINT escala_duracion_curso CHECK(escala_duracion IN ('HORA', 'DIA', 'SEMANA', 'MES'))
);

CREATE TABLE lecciones (
  uuid UUID NOT NULL,
  titulo VARCHAR(80) NOT NULL,
  descripcion VARCHAR(512) NOT NULL,
  contenido VARCHAR(1024) NOT NULL,
  uuid_curso UUID NOT NULL,
  CONSTRAINT leccion_pk PRIMARY KEY(uuid),
  CONSTRAINT curso_leccion_fk FOREIGN KEY(uuid_curso) REFERENCES cursos(uuid)
);

CREATE TABLE certificados (
  uuid UUID NOT NULL,
  fecha_expedicion DATE NOT NULL,
  descripcion VARCHAR(512) NOT NULL,
  uuid_curso UUID NOT NULL,
  uuid_empleado UUID NOT NULL,
  CONSTRAINT certificado_pk PRIMARY KEY(uuid),
  CONSTRAINT curso_certificado_fk FOREIGN KEY(uuid_curso) REFERENCES cursos(uuid),
  CONSTRAINT empleado_certificado_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid)
);

CREATE TABLE cuestionarios (
  uuid UUID NOT NULL,
  valor_duracion NUMERIC(2,0) NOT NULL,
  escala_duracion VARCHAR(10) NOT NULL,
  intentos_permitidos NUMERIC(1,0) NOT NULL,
  uuid_curso UUID NOT NULL,
  CONSTRAINT cuestionario_pk PRIMARY KEY(uuid),
  CONSTRAINT curso_cuestionario_fk FOREIGN KEY(uuid_curso) REFERENCES cursos(uuid),
  CONSTRAINT escala_duracion_certificado CHECK(escala_duracion IN ('MINUTO', 'HORA'))
);

CREATE TABLE preguntas_cuestionarios (
  uuid UUID NOT NULL,
  enunciado VARCHAR(264) NOT NULL,
  tipo VARCHAR(10) NOT NULL,
  ponderacion NUMERIC(3,0) NOT NULL,
  uuid_cuestionario UUID NOT NULL,
  CONSTRAINT pregunta_pk PRIMARY KEY(uuid),
  CONSTRAINT cuestionario_pregunta_fk FOREIGN KEY(uuid_cuestionario) REFERENCES cuestionarios(uuid),
  CONSTRAINT tipo_pregunta CHECK(tipo IN ('LISTA', 'SIMPLE', 'MULTIPLE'))
);

CREATE TABLE opciones_preguntas (
  uuid UUID NOT NULL,
  valor VARCHAR(80) NOT NULL,
  correcto BOOLEAN NOT NULL,
  uuid_pregunta UUID NOT NULL,
  CONSTRAINT opcion_pk PRIMARY KEY(uuid),
  CONSTRAINT pregunta_opcion_fk FOREIGN KEY(uuid_pregunta) REFERENCES preguntas_cuestionarios(uuid)
);

CREATE TABLE habilidades_empleados (
  uuid_habilidad UUID NOT NULL,
  uuid_empleado UUID NOT NULL,
  CONSTRAINT habilidad_empleado_pk PRIMARY KEY(uuid_habilidad, uuid_empleado),
  CONSTRAINT habilidad_habilidad_empleado_fk FOREIGN KEY(uuid_habilidad) REFERENCES habilidades(uuid),
  CONSTRAINT empleado_habilidad_empleado_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid)
);

CREATE TABLE habilidades_empresas (
  uuid_habilidad UUID NOT NULL,
  uuid_empresa UUID NOT NULL,
  CONSTRAINT habilidad_empresa_pk PRIMARY KEY(uuid_habilidad, uuid_empresa),
  CONSTRAINT habilidad_habilidad_empresa_fk FOREIGN KEY(uuid_habilidad) REFERENCES habilidades(uuid),
  CONSTRAINT empresa_habilidad_empresa_fk FOREIGN KEY(uuid_empresa) REFERENCES empresas(uuid)
);

CREATE TABLE habilidades_ofertas (
  uuid_habilidad UUID NOT NULL,
  uuid_oferta UUID NOT NULL,
  CONSTRAINT habilidad_oferta_pk PRIMARY KEY(uuid_habilidad, uuid_oferta),
  CONSTRAINT habilidad_habilidad_oferta_fk FOREIGN KEY(uuid_habilidad) REFERENCES habilidades(uuid),
  CONSTRAINT oferta_habilidad_oferta_fk FOREIGN KEY(uuid_oferta) REFERENCES ofertas_laborales(uuid)
);

CREATE TABLE habilidades_cursos (
  uuid_habilidad UUID NOT NULL,
  uuid_curso UUID NOT NULL,
  CONSTRAINT habilidad_curso_pk PRIMARY KEY(uuid_habilidad, uuid_curso),
  CONSTRAINT habilidad_habilidad_curso_fk FOREIGN KEY(uuid_habilidad) REFERENCES habilidades(uuid),
  CONSTRAINT curso_habilidad_curso_fk FOREIGN KEY(uuid_curso) REFERENCES cursos(uuid)
);

CREATE TABLE cursos_empleados (
  uuid_curso UUID NOT NULL,
  uuid_empleado UUID NOT NULL,
  CONSTRAINT curso_empleado_pk PRIMARY KEY(uuid_curso, uuid_empleado),
  CONSTRAINT curso_curso_empleado_fk FOREIGN KEY(uuid_curso) REFERENCES cursos(uuid),
  CONSTRAINT empleado_curso_empleado_fk FOREIGN KEY(uuid_empleado) REFERENCES empleados(uuid)
);
