const executeQuery = require("../database/querys");

class User {
  async create(name, surname, email, taxRegistry, address = null) {
    let sql = `INSERT INTO USER (name, surname, email, taxreg , address)
    VALUES ('${name}', '${surname}', '${email}', '${taxRegistry}', '${address}'); `;

    return await executeQuery(sql).then(results => ({
      userId: results.insertId,
      name,
      surname,
      email,
      taxRegistry,
      address
    }));
  }

  async list() {
    let sql = `SELECT *, taxreg as taxRegistry FROM USER`;
    return await executeQuery(sql);
  }

  async getUserById(userId) {
    let sql = `SELECT *, taxreg as taxRegistry FROM USER WHERE userId = ${userId}`;
    return await executeQuery(sql).then(result => result[0]);
  }

  async update(userId, name, surname, email, address = null) {
    let sql = `UPDATE USER
    SET name='${name}', surname='${surname}', email='${email}', address='${address}'
    WHERE USER.userId = ${userId}; 
    SELECT taxreg FROM USER WHERE userId = ${userId};`;
    return await executeQuery(sql).then(results => ({
      userId,
      name,
      surname,
      email,
      taxRegistry: results[1][0].taxreg,
      address
    }));
  }

  async delete(userId) {
    let sql = `SELECT userId FROM USER WHERE userId = ${userId}`;
    let user = await executeQuery(sql);
    if (user.length == 0) return false;

    sql = `DELETE FROM USER WHERE USER.userId = ${userId};`;
    await executeQuery(sql);
    return true;
  }
}

module.exports = User;
