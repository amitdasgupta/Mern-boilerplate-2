const { push } = require("../../helpers/kueMethods");

module.exports = (app) => {
  app.post("/api/lighthouse", (req, res) => {
    pushForScoreGeneration(req.body);
    return res.status(200);
  });
};
