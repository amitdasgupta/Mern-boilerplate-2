const kue = require("kue");
const queue = kue.createQueue();
const axios = require("axios");
const { generateScoreAndSendMail } = require("./lighthouse");

//audits will have all the data
module.exports = {
  pushForScoreGeneration: (data = {}) => {
    const job = queue
      .create("ap-optimizer", {
        title: "Generate light-house scores",
        data,
      })
      .priority("high")
      .attempts(5)
      .save()
      .backoff(true)
      .save(function(err) {
        if (!err) console.log(job.id);
      });
  },
};

//queue processing
queue.process("ap-optimizer", async (job, done) => {
  try {
    generateScoreAndSendMail(job.data.data);
    done();
    return result.data;
  } catch (error) {
    done(error);
  }
});

queue.on("job enqueue", function(id, type) {
  console.log("Job %s got queued of type %s", id, type);
});

queue.on("error", function(err) {
  console.log("Oops... ", err);
});
