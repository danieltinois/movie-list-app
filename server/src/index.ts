import express from "express";
import cors from "cors";
import mongoose, { type ConnectOptions } from "mongoose";
import movieRoutes from "./routes/movieRoutes";

const app = express();
const PORT = 3001;

// Conectar ao MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/movieDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
