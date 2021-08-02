INSERT INTO direcciones VALUES
(
  'f240c768-b282-4132-a406-71caa2b4c04e', 
  'Avenida Francisco de Miranda', 
  '1060', 
  -- Caracas
  'a02cdc9b-8632-4540-aa96-d95d3ef53dba', 
  'Multicentro Empresarial del Este'
),
(
  'e5e15902-d27b-4e19-9dba-80018f86a90d',
  'Avenida Blandin',
  '1070',
  -- Caracas
  'a02cdc9b-8632-4540-aa96-d95d3ef53dba', 
  'Centro Comercial San Ignacio'
),
(
  'd2880933-8af8-487d-8f3d-ef4fc70e1463',
  'Avenida Libertador',
  '1080',
  -- Caracas
  'a02cdc9b-8632-4540-aa96-d95d3ef53dba', 
  'Centro Comercial Sambil'
);

INSERT INTO empresas VALUES
(
  '02cda65c-70ca-4496-8103-475a07f86386', 
  'OrangeSoft', 
  'ACTIVO', 
  'orangesoft@test.com', 
  '$2b$10$eNwWPIKt8JBFKU0tg7PXLOsp4GAQmkWByjTp66jyQWEtvqOTPDKAm', 
  -- j2Y0l0IMnyfYxZamQ1u67zSVve53
  'f240c768-b282-4132-a406-71caa2b4c04e',
  'Debe saber exprimir naranjas.'
),
(
  '1dd06e22-a107-47fd-8dfa-06df572df941',
  'LimonSoft',
  'ACTIVO',
  'limonsoft@test.com',
  '$2b$10$RAf9w9PnphDKw18AtTlacusX3Y8jK1MCDMyoqP27BSnVRLlwsPw9m',
  -- vKCoIae8XodSGNhx5xk5WppFbX02
  'e5e15902-d27b-4e19-9dba-80018f86a90d',
  'Debe saber exprimir limones.'
),
(
  '44bdc3ad-5ea9-4a5c-ad25-d597c4ec1a53',
  'MangoSoft',
  'ACTIVO',
  'mangosoft@test.com',
  '$2b$10$XfmDsbRpU4lmkcXTBZdaf.rniJRsbYbmsN3w8u.Oodvm.fND461Hq',
  -- kMKu7AavgnVObJLgrg3G1dEUEBy1
  'd2880933-8af8-487d-8f3d-ef4fc70e1463',
  'Debe saber exprimir mangos.'
);