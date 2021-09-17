const { push } = require("../../helpers/kueMethods");

module.exports = (app) => {
  app.get("/api/lighthouse", (req, res, next) => {
    push();
  });
};
