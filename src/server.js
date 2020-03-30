require("dotenv").config();
const customExpress = require("./configuration/customExpress");

const app = customExpress();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
