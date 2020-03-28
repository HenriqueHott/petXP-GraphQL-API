require("dotenv").config();
const knex = require("./knexConfig");

(async () => {
  let code = 0;

  try {
    await knex.raw(`
      CREATE TABLE IF NOT EXISTS users (
        userId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name varchar(256) NOT NULL,
        email varchar(256) NOT NULL,
        surname varchar(45) NOT NULL,
        taxRegistry varchar(45) NOT NULL,
        address varchar(256),
        createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT unique_users_email UNIQUE (email)
      ) ENGINE=InnoDB DEFAULT CHARSET = UTF8MB4;
    `);

    await knex.raw(`
      CREATE TABLE IF NOT EXISTS pets (
        petId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId int NOT NULL,
        name varchar(256) NOT NULL,
        type varchar(256) NOT NULL,
        breed varchar(256) NOT NULL,
        age int NOT NULL,
        weight float,
        createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_pets_userId FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET = UTF8MB4;
    `);

    await knex.raw(`
      CREATE TABLE IF NOT EXISTS requests (
        reqId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userId int NOT NULL,
        petId int NOT NULL,
        status varchar(45) NOT NULL,
        createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        completedAt datetime,
        CONSTRAINT FK_requests_userId FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE,
        CONSTRAINT FK_requests_petId FOREIGN KEY (petId) REFERENCES pets (petId) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET = UTF8MB4;
    `);
  } catch (err) {
    console.log(err);
    code = 1;
  } finally {
    process.exit(code);
  }
})();
