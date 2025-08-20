const express = require("express");
const router = express.Router();
const Tarefa = require("../models/Tarefa");

// Buscar tarefa
router.get("/", async (req, res) => {
  const { ano, mes, dia } = req.query;
  const tarefa = await Tarefa.findOne({ ano, mes, dia });
  res.json(tarefa || {});
});

// Criar ou atualizar tarefa
router.post("/", async (req, res) => {
  const { ano, mes, dia, texto } = req.body;

  try {
    const tarefaAtualizada = await Tarefa.findOneAndUpdate(
      { ano, mes, dia },
      { texto, ano, mes, dia },
      { upsert: true, new: true }
    );

    res.status(200).json(tarefaAtualizada);
  } catch (error) {
    console.error("Erro ao salvar tarefa:", error);
    res.status(500).json({ erro: "Erro ao salvar tarefa" });
  }
});

module.exports = router;
