INSERT INTO cursos VALUES
('784da0d8-9427-4b13-acaa-5f35ff3f0876', 'Aprendiendo Reposteria', 'ACTIVO', 1, 'SEMANA', now(), now()),
('e2f31fba-adee-4294-ac22-9834a1343800', 'Aprendiendo Plomeria', 'ACTIVO', 10, 'DIA', now(), now()),
('8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2', 'Aprendiendo Electricidad', 'ACTIVO', 5, 'DIA', now(), now());

INSERT INTO lecciones VALUES
(
  '9e70c21c-f776-47a8-976f-160b435a1bd0',
  'Reposteria basica #1',
  'Esta leccion es la primera parte de un grupo que contiene los principios de la reposteria.',
  'Este es el contenido de la leccion #1 de los principios de la respoteria.',
  '784da0d8-9427-4b13-acaa-5f35ff3f0876'
),
(
  'e3f7783b-6b59-4bcf-b992-3e9b093ad97a',
  'Reposteria basica #2',
  'Esta leccion es la segunda parte de un grupo que contiene los principios de la reposteria.',
  'Este es el contenido de la leccion #2 de los principios de la respoteria.',
  '784da0d8-9427-4b13-acaa-5f35ff3f0876'
),
(
  'fd8a37e3-458c-469d-9076-6221b72f5166',
  'Reposteria basica #3',
  'Esta leccion es la tercera parte de un grupo que contiene los principios de la reposteria.',
  'Este es el contenido de la leccion #3 de los principios de la respoteria.',
  '784da0d8-9427-4b13-acaa-5f35ff3f0876'
),
(
  'e31ad350-d53e-4892-94a7-9cbf5ca6e4a0',
  'Plomeria basica #1',
  'Esta leccion es la primera parte de un grupo que contiene los principios de la plomeria.',
  'Este es el contenido de la leccion #1 de los principios de la plomeria.',
  'e2f31fba-adee-4294-ac22-9834a1343800'
),
(
  '648a06a3-784e-440a-b9c4-fef93e2c2967',
  'Plomeria basica #2',
  'Esta leccion es la segunda parte de un grupo que contiene los principios de la plomeria.',
  'Este es el contenido de la leccion #2 de los principios de la plomeria.',
  'e2f31fba-adee-4294-ac22-9834a1343800'
),
(
  '228ba9f4-d7ed-455f-b37e-3fb2b9b39d70',
  'Plomeria basica #3',
  'Esta leccion es la tercera parte de un grupo que contiene los principios de la plomeria.',
  'Este es el contenido de la leccion #3 de los principios de la plomeria.',
  'e2f31fba-adee-4294-ac22-9834a1343800'
),
(
  'e1f1aa06-352d-4115-b60b-865aa0438ffb',
  'Electricidad basica #1',
  'Esta leccion es la primera parte de un grupo que contiene los principios de la electricidad.',
  'Este es el contenido de la leccion #1 de los principios de la electricidad.',
  '8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2'
),
(
  '63952870-2cd7-471f-8e84-e32e33ba8f77',
  'Electricidad basica #2',
  'Esta leccion es la segunda parte de un grupo que contiene los principios de la electricidad.',
  'Este es el contenido de la leccion #2 de los principios de la electricidad.',
  '8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2'
),
(
  '5b784a65-0f49-4492-857a-2d02ee94d207',
  'Electricidad basica #3',
  'Esta leccion es la tercera parte de un grupo que contiene los principios de la electricidad.',
  'Este es el contenido de la leccion #3 de los principios de la electricidad.',
  '8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2'
);

INSERT INTO habilidades_cursos VALUES
('69c08f52-f815-42d7-997c-03024c8f1382', 'e2f31fba-adee-4294-ac22-9834a1343800'),
('35f05b01-7b31-4c5d-8fe2-2008f5dc1d86', '8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2'),
('b63d4d7e-a220-483d-a226-5d5714afb791', '784da0d8-9427-4b13-acaa-5f35ff3f0876');

INSERT INTO cuestionarios VALUES
('27a7f1b8-ccf2-44a6-b8eb-a21a941f3850', 2, 'HORA', 1, '784da0d8-9427-4b13-acaa-5f35ff3f0876'),
('959c3c6c-6f71-433f-87a4-49e05a80713d', 1, 'HORA', 1, 'e2f31fba-adee-4294-ac22-9834a1343800'),
('6109f02a-d106-4705-8190-d1c00c1ef94b', 3, 'HORA', 1, '8fa3e9cb-bc9e-4ead-949f-a1e5a9df3af2');

INSERT INTO preguntas_cuestionarios VALUES
('dc529b12-1825-4df1-aa43-7da038617753', 'Cuantos gramos de azucar se le coloca a la torta?', 'SIMPLE', 50, '27a7f1b8-ccf2-44a6-b8eb-a21a941f3850'),
('0c8e5a6d-ff8f-44b5-b626-bf0a20fde009', 'Cuantos gramos de harina se le coloca a la torta?', 'SIMPLE', 50, '27a7f1b8-ccf2-44a6-b8eb-a21a941f3850'),
('ce4136ff-2065-4968-9eff-93bee4cf58e5', 'Cual es el mejor material para tuberias de aguas blancas?', 'SIMPLE', 50, '959c3c6c-6f71-433f-87a4-49e05a80713d'),
('dae2b72d-b59d-42af-a7d4-ff276a432e18', 'Cual es el mejor material para tuberias de aguas negras?', 'SIMPLE', 50, '959c3c6c-6f71-433f-87a4-49e05a80713d'),
('924cb84d-6e6c-4c90-8b06-d01c7446c854', 'Cual es la formula para calcular la resistencia?', 'SIMPLE', 50, '6109f02a-d106-4705-8190-d1c00c1ef94b'),
('34a5bd85-7450-42a3-9caf-3e1a3168bf7f', 'Cual es la formula para calcular el voltaje?', 'SIMPLE', 50, '6109f02a-d106-4705-8190-d1c00c1ef94b');

INSERT INTO opciones_preguntas VALUES
('657c200b-9325-4962-821f-073d1026da32', '200g', true, 'dc529b12-1825-4df1-aa43-7da038617753'),
('3d644d26-4a82-40fa-8e8e-0e13657ba562', '300g', false, 'dc529b12-1825-4df1-aa43-7da038617753'),
('4071a4d7-0185-4036-b40f-8f8b44631f29', '600g', true, '0c8e5a6d-ff8f-44b5-b626-bf0a20fde009'),
('7cbaeb1f-50e0-45c7-bd5e-0c9b3b933d74', '400g', false, '0c8e5a6d-ff8f-44b5-b626-bf0a20fde009'),
('f8129a6f-95b0-4951-9cd3-28a054e0f9d6', 'plastico', true, 'ce4136ff-2065-4968-9eff-93bee4cf58e5'),
('f0faf636-9bfe-4960-bbc7-78244b31bd15', 'metal', false, 'ce4136ff-2065-4968-9eff-93bee4cf58e5'),
('f57a9ee4-7a6d-4a55-9942-6f6e0b2fc268', 'metal', true, 'dae2b72d-b59d-42af-a7d4-ff276a432e18'),
('e07f4da1-934c-4458-adb9-af08bbc892af', 'plastico', false, 'dae2b72d-b59d-42af-a7d4-ff276a432e18'),
('bc85b2f1-b1c0-4617-bd52-d0b1f98cac03', 'R = V / I', true, '924cb84d-6e6c-4c90-8b06-d01c7446c854'),
('dbba26b7-b0a8-4281-a326-d0f13bc40fb9', 'R = I / V', false, '924cb84d-6e6c-4c90-8b06-d01c7446c854'),
('a16eca90-d25c-409d-9747-546e761dad05', 'V = I * R', true, '34a5bd85-7450-42a3-9caf-3e1a3168bf7f'),
('bc6a132b-17ff-43e1-bed2-694cab0de061', 'V = I * W', false, '34a5bd85-7450-42a3-9caf-3e1a3168bf7f');

