CREATE DATABASE db_reminder;

CREATE TABLE IF NOT EXISTS m_user (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "displayName" VARCHAR(128) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_user_session (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "userId" INT NOT NULL,
    "valid" BOOLEAN DEFAULT true NOT NULL,
    "userAgent" VARCHAR(128) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "fk_t_user_session_m_user" FOREIGN KEY("userId") REFERENCES m_user("id")
    ON DELETE NO ACTION
);

INSERT INTO m_user("displayName", "email", "password")
VALUES ('jeemercado', 'mercadojee@gmail.com', 'password');


UPDATE t_user_session SET valid = false WHERE id = 8;