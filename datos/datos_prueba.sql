INSERT INTO pais_orm VALUES
(gen_random_uuid(), 'Venezuela'),
(gen_random_uuid(), 'Zimbabwe'),
(gen_random_uuid(), 'Kenia'),
(gen_random_uuid(), 'Algeria'),
(gen_random_uuid(), 'Libano');

INSERT INTO estado_orm VALUES 
(gen_random_uuid(), 'Distrito Capital', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Merida', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Tachira', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Trujillo', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Vargas', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Miranda', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Aragua', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Carabobo', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Falcon', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Lara', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Yaracuy', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Amazonas', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Bolivar', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Delta Amacuro', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Nueva Esparta', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Dependencias federales', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Apure', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Barinas', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Cojedes', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Guarico', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Portuguesa', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Anzoategui', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Monagas', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Sucre', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela')),
(gen_random_uuid(), 'Zulia', (SELECT uuid FROM pais_orm WHERE nombre = 'Venezuela'));

INSERT INTO ciudad_orm VALUES (
  gen_random_uuid(), 
  'Caracas', 
  (SELECT uuid FROM estado_orm WHERE nombre = 'Distrito Capital')
);

INSERT INTO direccion_orm VALUES (
  '22222222-2222-2222-2222-222222222222', 
  'Calle la Naranja Exprimida', 
  'ORANGE', 
  (SELECT uuid from ciudad_orm WHERE nombre = 'Caracas')
);

INSERT INTO empresa_orm VALUES (
  '11111111-1111-1111-1111-111111111111', 
  'OrangeSoft', 
  'orange@soft.com', 
  '22222222-2222-2222-2222-222222222222'
);

INSERT INTO empleado_orm VALUES (
  '33333333-3333-3333-3333-333333333333', 
  'Carlos', 
  'Daniel', 
  'Perez', 
  'Pila', 
  'masculino', 
  TO_DATE('16/06/1999', 'dd/mm/yyyy'), '+584141737600', '22222222-2222-2222-2222-222222222222'
);

INSERT INTO oferta_laboral_orm VALUES (
  '5664e406-c871-4050-9884-559628a6733f', 
  'Conductor de Autobus a tiempo completo', 
  '2021-07-04 13:42:40.171', null, 
  'Conductor', 
  10000, 
  'Se busca conductor que sepa manejar Encava.', 
  5, 
  'mes',
  'diurno', 
  1, 
  'publicado', 
  '11111111-1111-1111-1111-111111111111'
);

INSERT INTO postulacion_oferta_orm VALUES (
  '4cfa5081-3acc-4f61-b92e-c53db3d76957',
  'en proceso',
  '2021-07-04 13:47:58.47',
  'Traigo mi propio Encava no hay problema.',
  '5664e406-c871-4050-9884-559628a6733f',
  '33333333-3333-3333-3333-333333333333'
);