const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema({
  ano: Number,
  mes: Number,
  dia: Number,
  texto: String,
});

module.exports = mongoose.model("Tarefa", tarefaSchema);
