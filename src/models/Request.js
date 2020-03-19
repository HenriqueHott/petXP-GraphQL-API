const executeQuery = require("../database/querys");

class Request {
  async create(userId, petId) {
    let sql = `INSERT INTO REQUEST (userId, petId, createdAt, status) VALUES (${userId}, ${petId}, current_timestamp(), 'pending');`;
    return await executeQuery(sql).then(results => ({
      reqId: results.insertId,
      userId,
      petId,
      createdAt: Date("YYYY-MM-DD THH:mm:ss"),
      finishedAt: null,
      status: "pending"
    }));
  }

  async list() {
    let sql = `SELECT * FROM REQUEST`;
    return await executeQuery(sql).then(results =>
      results.map(result => {
        result.createdAt = Date(result.createdAt);
        if (result.finishedAt != null)
          result.finishedAt = Date(result.finishedAt);

        return result;
      })
    );
  }

  async listRequestsByUser(userId) {
    let sql = `SELECT * FROM REQUEST WHERE userId=${userId}`;
    return await executeQuery(sql).then(results =>
      results.map(result => {
        result.createdAt = Date(result.createdAt);
        if (result.finishedAt != null)
          result.finishedAt = Date(result.finishedAt);

        return result;
      })
    );
  }

  async listRequestsByPet(petId) {
    let sql = `SELECT * FROM REQUEST WHERE petId=${petId}`;
    return await executeQuery(sql).then(results =>
      results.map(result => {
        result.createdAt = Date(result.createdAt);
        if (result.finishedAt != null)
          result.finishedAt = Date(result.finishedAt);

        return result;
      })
    );
  }

  async listRequestsByStatus(status) {
    let sql = `SELECT * FROM REQUEST WHERE status='${status}'`;
    return await executeQuery(sql).then(results =>
      results.map(result => {
        result.createdAt = Date(result.createdAt);
        if (result.finishedAt != null)
          result.finishedAt = Date(result.finishedAt);

        return result;
      })
    );
  }

  async getRequestById(reqId) {
    let sql = `SELECT * FROM REQUEST WHERE reqId=${reqId}`;
    return await executeQuery(sql).then(results => ({
      reqId: results[0].reqId,
      createdAt: Date(results[0].createdAt),
      finishedAt: results[0] == null ? null : Date(results[0].finishedAt),
      userId: results[0].userId,
      petId: results[0].petId,
      status: results[0].status
    }));
  }

  async update(reqId, status) {
    let sql = `SELECT * FROM REQUEST WHERE reqId=${reqId}`;
    return await executeQuery(sql).then(async results => {
      if (results.length == 0) throw Error("Request not found");

      if (results[0].status == "finished")
        throw Error("Request finished cannot be change");

      let finishedAt = status == "finished" ? Date() : null;

      sql =
        status == "finished"
          ? `UPDATE REQUEST SET status='${status}', finishedAt=current_timestamp() WHERE reqId=${reqId};`
          : `UPDATE REQUEST SET status='${status}' WHERE reqId=${reqId};`;

      await executeQuery(sql);
      return {
        reqId: results[0].reqId,
        createdAt: Date(results[0].createdAt),
        finishedAt,
        userId: results[0].userId,
        petId: results[0].petId,
        status
      };
    });
  }

  async delete(reqId) {
    let sql = `SELECT reqId FROM REQUEST WHERE reqId=${reqId}`;
    let request = await executeQuery(sql);
    if (request.length == 0) return false;

    sql = `DELETE FROM REQUEST WHERE reqId = ${reqId};`;
    await executeQuery(sql);
    return true;
  }
}

module.exports = Request;
