const executeQuery = require("./querys");

module.exports = async () => {
  sql = `
  CREATE TABLE IF NOT EXISTS \`user\` (
    \`userId\` int NOT NULL AUTO_INCREMENT,
    \`name\` varchar(256) NOT NULL,
    \`email\` varchar(256) NOT NULL,
    \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    \`surname\` varchar(45) NOT NULL,
    \`taxreg\` varchar(45) NOT NULL,
    \`address\` varchar(256) DEFAULT NULL,
    PRIMARY KEY (\`userId\`),
    UNIQUE KEY \`email_UNIQUE\` (\`email\`)
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;
  
  CREATE TABLE IF NOT EXISTS \`pet\` (
     \`petId\` int NOT NULL AUTO_INCREMENT,
     \`userId\` int NOT NULL,
     \`name\` varchar(256) NOT NULL,
     \`type\` varchar(256) NOT NULL,
     \`breed\` varchar(256) NOT NULL,
     \`age\` int NOT NULL,
     \`weight\` float DEFAULT NULL,
     PRIMARY KEY (\`petId\`),
     CONSTRAINT \`fk_PET_USER\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`userId\`) ON DELETE CASCADE ON UPDATE CASCADE
   ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;
  
  CREATE TABLE IF NOT EXISTS \`request\` (
    \`reqId\` int NOT NULL AUTO_INCREMENT,
    \`createdAt\` datetime DEFAULT NULL,
    \`finishedAt\` datetime DEFAULT NULL,
    \`userId\` int NOT NULL,
    \`petId\` int NOT NULL,
    \`status\` varchar(45) NOT NULL,
    PRIMARY KEY (\`reqId\`),
    CONSTRAINT \`petId\` FOREIGN KEY (\`petId\`) REFERENCES \`pet\` (\`petId\`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT \`userId\` FOREIGN KEY (\`userId\`) REFERENCES \`user\` (\`userId\`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=UTF8MB4;`;

  await executeQuery(sql);
}
