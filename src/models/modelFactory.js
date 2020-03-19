const models = {
  pet: require("./Pet"),
  user: require("./User"),
  request: require("./Request")
};

module.exports = model => new models[model]();
