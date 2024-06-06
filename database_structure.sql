CREATE TABLE ciudad (
    nombre VARCHAR(255),
    departamento VARCHAR(255),
    codigo_ciudad VARCHAR(255) NOT NULL,
    PRIMARY KEY (codigo_ciudad)
);

CREATE TABLE lugar (
    nombre VARCHAR(255),
    direccion VARCHAR(255),
    aforo INT,
    descripcion VARCHAR(255),
    foto VARCHAR(255),
    ubicacion VARCHAR(255),
    estado VARCHAR(255),
    codigo_lugar VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255),
    PRIMARY KEY (codigo_lugar),
    FOREIGN KEY (ciudad) REFERENCES ciudad(codigo_ciudad)
);

CREATE TABLE persona (
    id VARCHAR(255) NOT NULL,
    rol VARCHAR(255),
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    nickname VARCHAR(255),
    genero VARCHAR(255),
    correo_electronico VARCHAR(255),
    contraseña VARCHAR(255),
    ciudad VARCHAR(255),
    fecha_nacimiento DATE,
    token_recuperacion VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (ciudad) REFERENCES ciudad(codigo_ciudad)
);

CREATE TABLE evento (
    descripcion VARCHAR(255),
    fecha DATE,
    nombre VARCHAR(255),
    codigo_evento VARCHAR(255) NOT NULL,
    lugar VARCHAR(255),
    creador VARCHAR(255),
    hora_final TIME,
    hora_inicio TIME,
    PRIMARY KEY (codigo_evento),
    FOREIGN KEY (creador) REFERENCES persona(id),
    FOREIGN KEY (lugar) REFERENCES lugar(codigo_lugar)
);

CREATE TABLE evento_participa (
    codigo_evento_participa VARCHAR(255) NOT NULL,
    persona VARCHAR(255),
    evento VARCHAR(255),
    PRIMARY KEY (codigo_evento_participa),
    FOREIGN KEY (evento) REFERENCES evento(codigo_evento),
    FOREIGN KEY (persona) REFERENCES persona(id)
);


CREATE TABLE tematica (
    nombre VARCHAR(255),
    codigo_tematica VARCHAR(255) NOT NULL,
    PRIMARY KEY (codigo_tematica)
);

CREATE TABLE tematica_evento (
    codigo_tematica_evento VARCHAR(255) NOT NULL,
    evento VARCHAR(255),
    tematica VARCHAR(255),
    PRIMARY KEY (codigo_tematica_evento),
    FOREIGN KEY (evento) REFERENCES evento(codigo_evento),
    FOREIGN KEY (tematica) REFERENCES tematica(codigo_tematica)
);

INSERT INTO public.ciudad(
	nombre, departamento, codigo_ciudad)
	VALUES ('Tuluá', 'Valle del Cauca', '111'),
	('Cali', 'Valle del Cauca', '222');
	

INSERT INTO tematica (nombre, codigo_tematica) VALUES
    ('Tecnología', 'T001'),
    ('Ciencia', 'T002'),
    ('Salud', 'T003'),
    ('Educación', 'T004'),
    ('Negocios', 'T005'),
    ('Arte', 'T006'),
    ('Música', 'T007'),
    ('Deportes', 'T008'),
    ('Literatura', 'T009'),
    ('Cine', 'T010'),
    ('Gastronomía', 'T011'),
    ('Medio Ambiente', 'T012'),
    ('Historia', 'T013'),
    ('Política', 'T014'),
    ('Moda', 'T015'),
    ('Viajes', 'T016'),
    ('Fotografía', 'T017'),
    ('Psicología', 'T018'),
    ('Innovación', 'T019'),
    ('Desarrollo Personal', 'T020');




