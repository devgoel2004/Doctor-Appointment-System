const express = require("express");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
// const { connect } = require("mongoose");
const connectDB = require("./config/db");
//dotenv config
dotenv.config();

//mongoDB
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   // Respond to preflight requests
//   if (req.method === "OPTIONS") {
//     res.sendStatus(204);
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("", require("./routes/userRoutes"));
//listen port
const port = process.env.PORT;

app.listen(port, () => {
  console.log(
    `Server is running in ${process.env.NODE_MODE} mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});
