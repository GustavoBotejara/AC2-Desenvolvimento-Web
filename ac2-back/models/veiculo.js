const mongoose = require("mongoose");

const Veiculo = mongoose.model("Veiculo", {
  id: String,
  marca: String,
  modelo: String,
  anoFab: Number,
});

module.exports = Veiculo;
