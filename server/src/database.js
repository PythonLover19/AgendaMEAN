const mongoose = require("mongoose");

const URI = "mongodb://localhost/agenda-crud";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((db) => console.log("db está conectada"))
  .catch((err) => console.error(err));

module.exports = mongoose;
