require("dotenv").config();

const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const cardRoutes = require("./routes/Cards");
const playerRoutes = require("./routes/Players");
const roundRoutes = require("./routes/Rounds");

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/cards", cardRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/rounds", roundRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
