const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const tarefasRoutes = require("./routes/tarefas");

const path = require("path");

// Serve arquivos da pasta public

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(
    "mongodb+srv://lucds2ls:Fiona2018@cluster0.leomtxh.mongodb.net/planner?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error(err));

app.use("/api/tarefas", tarefasRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
