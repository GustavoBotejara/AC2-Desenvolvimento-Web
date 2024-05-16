const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

app.use(express.json());

const veiculosController = require("./controllers/veiculosController");
app.use("/veiculos", veiculosController);

mongoose
  .connect("mongodb://127.0.0.1:27017/")
  .then(() => {
    app.listen(27017, () => {
      console.log("Conectado ao mongoDB");
      console.log("Servidor iniciado na porta 27017");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => console.log("Servidor rodando na porta: 3000"));
