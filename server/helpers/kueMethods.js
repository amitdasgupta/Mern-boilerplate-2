const kue = require("kue");
const queue = kue.createQueue();
const axios = require("axios");
module.exports = {
  push: (data) => {
    for (let i = 1; i <= 20; i++) {
      const job = queue
        .create("ap-optimizer", {
          title: "Generate light-house scores",
          data: i,
        })
        .priority("high")
        .attempts(5)
        .save()
        .backoff(true)
        .save(function(err) {
          if (!err) console.log(job.id);
        });
    }
  },
};

//queue processing
queue.process("ap-optimizer", async (job, done) => {
  try {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/" + job.data.data
    );
    const { data } = result;
    console.log(data, job.data.data);
    //here we will generate scores
    done();
    return result.data;
  } catch (error) {
    done(error);
  }
  // axios
  //   .get("https://jsonplaceholder.typicode.com/todos/" + job.data.data)
  //   .then((result) => {
  //     console.log(result.data);
  //     done();
  //     return result.data;
  //   })
  //   .catch((error) => done(error));
});

queue
  .on("job enqueue", function(id, type) {
    console.log("Job %s got queued of type %s", id, type);
  })
  .on("job complete", function(id, result) {
    kue.Job.get(id, function(err, job) {
      if (err) return;
      job.remove(function(err) {
        if (err) throw err;
        console.log("removed completed job #%d", job.id);
      });
    });
  });

queue.on("error", function(err) {
  console.log("Oops... ", err);
});
