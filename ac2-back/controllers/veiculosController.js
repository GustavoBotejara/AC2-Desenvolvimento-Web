const express = require("express");
const router = express.Router();

const Veiculo = require("../models/veiculo");

router.get("/", async (req, res) => {
  try {
    const veiculos = await Veiculo.find();
    res.json(veiculos);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const veiculo = await Veiculo.findById(id);
    res.json(veiculo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { marca, modelo, anoFab } = req.body;

    const veiculo = {
      marca,
      modelo,
      anoFab,
    };

    const updateVeiculo = await Veiculo.updateOne({ _id: id }, veiculo);

    if (updateVeiculo.matchedCount === 0) {
      res.status(422).json({ mensagem: "Veiculo não encontrado" });
      return;
    }

    res.status(200).json(veiculo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const veiculo = await Veiculo.findById({ _id: id });

    if (!veiculo) {
      res.status(422).json({ mensagem: "Veiculo não encontrado" });
      return;
    }

    await Veiculo.deleteOne({ _id: id });

    res.status(200).json({ mensagem: `${id} - Excluído com sucesso!` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req, res) => {
  const { marca, modelo, anoFab } = req.body;

  const veiculo = {
    marca,
    modelo,
    anoFab,
  };

  try {
    await Veiculo.create(veiculo);
    res.status(201).json(veiculo);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
