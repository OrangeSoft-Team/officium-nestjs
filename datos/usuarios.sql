INSERT INTO personales_administrativos VALUES
(
  gen_random_uuid(), 
  'Miguel', 
  'De Olim', 
  'miguel@officium.com', 
  'Gerente', 
  '$2b$10$9DMoliPD2ZN3k.QB.UkHuu2FuIQpLR3vhAKbAGCuPI8tviIAz0uFq' /* 1 */
);

INSERT INTO direcciones VALUES
(
  'a79a4f10-c11d-4e72-ab95-152a520ac8a5',
  'Av. La Naranja Exprimida',
  '123456',
  (SELECT uuid FROM ciudades WHERE nombre = 'Caracas'),
  'Res. Citrica'
);

INSERT INTO empresas VALUES
(
  gen_random_uuid(),
  'OrangeSoft',
  'ACTIVO',
  'orange@soft.com',
  '$2b$10$89i5Nyp9ti0ocNW1kqqspuAbEWEVGLJjdJ32HdPaa.2aJSvxayGTK', /* 1 */
  'a79a4f10-c11d-4e72-ab95-152a520ac8a5', 
  NULL
);