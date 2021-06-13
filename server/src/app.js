const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
// const corsOptions = {origin: "http://localhost:4200"}
app.use(cors());
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(function(req, res, next) {
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With,Content-Type, Accept');
 res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 next();
});


// Routes
app.use("/api/employee", require("./routes/employee.routes"));

module.exports = app;
