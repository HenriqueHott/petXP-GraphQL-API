const connection = require("./connection");

const executeQuery = query =>
  new Promise((resolve, reject) =>
    connection.beginTransaction(err => {
      if (err) {
        reject(err);
      }

      connection.query(query, (err, results) => {
        if (err) {
          connection.rollback();
          reject(err);
        }
        connection.commit();
        resolve(results);
      });
    })
  );

module.exports = executeQuery;
