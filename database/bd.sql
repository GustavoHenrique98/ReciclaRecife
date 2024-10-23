create database recicla_recife;
use recicla_recife;


create table Organizacoes(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cnpj varchar(20),
	nome_fantasia varchar(100),
    email VARCHAR(100),
    password VARCHAR(100),
    porte VARCHAR(20),
    telefone CHAR(11),
    localizacao_organizacao TEXT,
    responsavel_organizacao varchar(60)
);


create table Eventos(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nome_evento VARCHAR(100),
    localizacao_evento TEXT,
    descricao_evento TEXT,
    data_evento DATE , 
    organizacao_id INT,
    FOREIGN KEY (organizacao_id) REFERENCES Organizacoes(ID)
);

create table Estrategias(
	ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	titulo_estrategia VARCHAR(50),
    tipo_estrategia VARCHAR(50)
    descricao_estrategia TEXT,
    efetividade_estrategia VARCHAR(20)
);



create table Est_evt(
	id_evento INT, 
    id_Estrategia INT,
    PRIMARY KEY (id_evento,id_estrategia),
    FOREIGN KEY(id_evento) REFERENCES Eventos(ID),
    FOREIGN KEY (id_estrategia) REFERENCES Estrategias(ID)
);

-- INSERTS










-- SELECTS