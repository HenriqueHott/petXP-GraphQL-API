const customExpress = require("./configuration/customExpress");
const connection = require("./database/connection");
const createTables = require("./database/createTables");

connection.connect(err => {
  if (err) {
    console.log("Error to comunicate with database:" + err.stack);
    return;
  }
  console.log("Connected in the database");
  createTables(); // remove this line to remove auto create
});

app = customExpress();
app.listen(4000, () => {
  console.log("Server Running on port 4000");
});
