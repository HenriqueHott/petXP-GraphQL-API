const executeQuery = require("../database/querys");

class Pet {
  async create(userId, name, type, breed, age, weight) {
    let sql = `INSERT INTO PET (userId, name, type, breed, age, weight)
        VALUES (${userId}, '${name}', '${type}', '${breed}', ${age}, ${weight}); 
        `;

    return await executeQuery(sql).then(results => ({
      petId: results.insertId,
      userId,
      name,
      type,
      breed,
      age,
      weight
    }));
  }

  async list() {
    let sql = "SELECT * FROM PET";
    return await executeQuery(sql);
  }

  async getPetById(petId) {
    let sql = `SELECT * FROM PET WHERE PET.petId = ${petId}`;
    return await executeQuery(sql).then(results => results[0]);
  }

  async getPetsByOwner(userId) {
    let sql = `SELECT * 
                   FROM PET
                   WHERE PET.userId = ${userId}`;

    return await executeQuery(sql);
  }

  async update(petId, name, type, breed, age, weight) {
    let sql = `UPDATE PET SET name='${name}', type='${type}', breed='${breed}', age=${age}, weight=${weight} WHERE petId=${petId};
           SELECT userId FROM PET WHERE petId=${petId};`;
    return await executeQuery(sql).then(results => ({
      petId,
      userId: results[1][0].userId,
      name,
      type,
      breed,
      age,
      weight
    }));
  }

  async delete(petId) {
    let sql = `SELECT petId FROM PET WHERE petId = ${petId}`;
    let pet = await executeQuery(sql);
    if (pet.length == 0) return false;

    sql = `DELETE FROM PET WHERE petId = ${petId};`;
    await executeQuery(sql);
    return true;
  }
}

module.exports = Pet;
