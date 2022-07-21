-- Creando tabla de "Puestos"
CREATE TABLE IF NOT EXISTS public."Puestos"
(
	"idPuesto" character varying(20) COLLATE pg_catalog."default" NOT NULL,
	puesto character varying COLLATE pg_catalog."default" NOT NULL,
	CONSTRAINT "idPuesto" PRIMARY KEY ("idPuesto")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Puestos"
	OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Personal"
CREATE TABLE IF NOT EXISTS public."Personal"
(
    "idPersonal" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    nombres character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "apellidoP" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "apellidoM" character varying(45) COLLATE pg_catalog."default" NOT NULL,
    "idDepartamento" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idPuesto" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "noEmpleado" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "idPersonal" PRIMARY KEY ("idPersonal"),
    CONSTRAINT "idDepartamento" FOREIGN KEY ("idDepartamento")
        REFERENCES public."Departamentos" ("idDepartamento") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "idPuesto" FOREIGN KEY ("idPuesto")
        REFERENCES public."Puestos" ("idPuesto") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Personal"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Cuentas de Acceso"

CREATE TABLE IF NOT EXISTS public."CuentasDeAcceso"
(
    "idCuentaDeAcceso" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idPersonal" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    usuario character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "idCuentaDeAcceso" PRIMARY KEY ("idCuentaDeAcceso"),
    CONSTRAINT "idPersonal" FOREIGN KEY ("idPersonal")
        REFERENCES public."Personal" ("idPersonal") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CuentasDeAcceso"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Equipos"
CREATE TABLE IF NOT EXISTS public."Equipos"
(
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    numeracion integer,
    "idDepartamento" character varying(20) COLLATE pg_catalog."default",
    "idPuesto" character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT "idEquipo" PRIMARY KEY ("idEquipo"),
    CONSTRAINT "idDepartamento" FOREIGN KEY ("idDepartamento")
        REFERENCES public."Departamentos" ("idDepartamento") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID,
    CONSTRAINT "idPuesto" FOREIGN KEY ("idPuesto")
        REFERENCES public."Puestos" ("idPuesto") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Equipos"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando la tabla modelos
CREATE TABLE IF NOT EXISTS public."Modelos"
(
    "idModelo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying COLLATE pg_catalog."default" NOT NULL,
    marca character varying COLLATE pg_catalog."default" NOT NULL,
    modelo character varying COLLATE pg_catalog."default",
    CONSTRAINT "idModelo" PRIMARY KEY ("idModelo")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Modelos"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Dispositivos"
CREATE TABLE IF NOT EXISTS public."Dispositivos"
(
    "idDispositivo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idModelo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "numeroDeSerie" character varying COLLATE pg_catalog."default",
    "fechaAdquisición" date,
    "fechaRetiro" date,
    CONSTRAINT "idDispositivo" PRIMARY KEY ("idDispositivo"),
    CONSTRAINT "idEquipo" FOREIGN KEY ("idEquipo")
        REFERENCES public."Equipos" ("idEquipo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "idModelo" FOREIGN KEY ("idModelo")
        REFERENCES public."Modelos" ("idModelo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Dispositivos"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Crenado tabla de "Encargados"
CREATE TABLE IF NOT EXISTS public."Encargados"
(
    "idEncargado" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idPersonal" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "idEncargado" PRIMARY KEY ("idEncargado"),
    CONSTRAINT "idEquipo" FOREIGN KEY ("idEquipo")
        REFERENCES public."Equipos" ("idEquipo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "idPersonal" FOREIGN KEY ("idPersonal")
        REFERENCES public."Personal" ("idPersonal") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Encargados"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando Tabla de CTCs
CREATE TABLE IF NOT EXISTS public."CTCs"
(
    "idCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    descripcion character varying COLLATE pg_catalog."default",
    CONSTRAINT "idCTC" PRIMARY KEY ("idCTC")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."CTCs"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Equipos de CTC"
CREATE TABLE IF NOT EXISTS public."EquiposDeCTC"
(
    "idEquiposDeCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    maquina character varying(20) COLLATE pg_catalog."default",
    CONSTRAINT "idEquiposDeCTC" PRIMARY KEY ("idEquiposDeCTC"),
    CONSTRAINT "idCTC" FOREIGN KEY ("idCTC")
        REFERENCES public."CTCs" ("idCTC") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."EquiposDeCTC"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando Tabla de Bitacora de CTCs
CREATE TABLE IF NOT EXISTS public."BitacoraCTCs"
(
    "idBitacoraCTCs" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    nombres character varying COLLATE pg_catalog."default" NOT NULL,
    licenciatura character varying COLLATE pg_catalog."default" NOT NULL,
    "horaEntrada" time with time zone NOT NULL,
    "horaSalida" time with time zone,
    matricula character varying(8) COLLATE pg_catalog."default" NOT NULL,
    fecha date NOT NULL,
    CONSTRAINT "idBitacoraCTCs" PRIMARY KEY ("idBitacoraCTCs"),
    CONSTRAINT "idCTC" FOREIGN KEY ("idCTC")
        REFERENCES public."CTCs" ("idCTC") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."BitacoraCTCs"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando la tabla "Revisiones de CTC"

CREATE TABLE IF NOT EXISTS public."RevisionesCTC"
(
    "idRevision" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    fecha date NOT NULL,
    "totalEquipos" integer NOT NULL,
    "malEstado" integer,
    observaciones text COLLATE pg_catalog."default",
    CONSTRAINT "idRevision" PRIMARY KEY ("idRevision"),
    CONSTRAINT "idCTC" FOREIGN KEY ("idCTC")
        REFERENCES public."CTCs" ("idCTC") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."RevisionesCTC"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando Tabla de Software
CREATE TABLE IF NOT EXISTS public."Software"
(
    "idSoftware" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    nombre character varying COLLATE pg_catalog."default" NOT NULL,
    version character varying COLLATE pg_catalog."default",
    CONSTRAINT "idSoftware" PRIMARY KEY ("idSoftware")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Software"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando "Software de CTC"
CREATE TABLE IF NOT EXISTS public."SoftwareDeCTC"
(
    "idSoftwareDeCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idCTC" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idSoftware" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "idSoftwareDeCTC" PRIMARY KEY ("idSoftwareDeCTC"),
    CONSTRAINT "idCTC" FOREIGN KEY ("idCTC")
        REFERENCES public."CTCs" ("idCTC") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "idSoftware" FOREIGN KEY ("idSoftware")
        REFERENCES public."Software" ("idSoftware") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SoftwareDeCTC"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando Software de Equipo
CREATE TABLE IF NOT EXISTS public."SoftwareDeEquipo"
(
    "idSoftwareDeEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idSoftware" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "idSoftwareDeEquipo" PRIMARY KEY ("idSoftwareDeEquipo"),
    CONSTRAINT "idEquipo" FOREIGN KEY ("idEquipo")
        REFERENCES public."Equipos" ("idEquipo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "idSoftware" FOREIGN KEY ("idSoftware")
        REFERENCES public."Software" ("idSoftware") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SoftwareDeEquipo"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


--Creando "Solicitudes de Equipo"
CREATE TABLE IF NOT EXISTS public."SolicitudesDeEquipo"
(
    "idSolicitudesDeEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idCuentaDeAcceso" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    cantidad integer NOT NULL,
    descripcion text COLLATE pg_catalog."default" NOT NULL,
    justificacion text COLLATE pg_catalog."default" NOT NULL,
    mes integer NOT NULL,
    fecha date NOT NULL,
    CONSTRAINT "SolicitudesDeEquipo_pkey" PRIMARY KEY ("idSolicitudesDeEquipo")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."SolicitudesDeEquipo"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Informe de mantenimiento"
CREATE TABLE IF NOT EXISTS public."InformeMantenimiento"
(
    "idInformeMantenimiento" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idEquipo" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    problema character varying COLLATE pg_catalog."default" NOT NULL,
    condicion character varying COLLATE pg_catalog."default" NOT NULL,
    descripcion text COLLATE pg_catalog."default",
    fecha date NOT NULL,
    CONSTRAINT "idInformeMantenimiento" PRIMARY KEY ("idInformeMantenimiento"),
    CONSTRAINT "idEquipo" FOREIGN KEY ("idEquipo")
        REFERENCES public."Equipos" ("idEquipo") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."InformeMantenimiento"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------


-- Creando tabla de "Descripcion de mantenimiento"
CREATE TABLE IF NOT EXISTS public."DescripcionMantenimiento"
(
    "idDescripcionMantenimiento" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "idMantenimiento" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "actividadRealizada" text COLLATE pg_catalog."default",
    "fechaInicio" date NOT NULL,
    "fechaFin" date,
    observaciones text COLLATE pg_catalog."default",
    CONSTRAINT "idDescripcionMantenimiento" PRIMARY KEY ("idDescripcionMantenimiento"),
    CONSTRAINT "idMantenimiento" FOREIGN KEY ("idMantenimiento")
        REFERENCES public."InformeMantenimiento" ("idInformeMantenimiento") MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."DescripcionMantenimiento"
    OWNER to "GestcoDbAdmin";
-------------------------------------------------
