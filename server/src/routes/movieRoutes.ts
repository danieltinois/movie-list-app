import express from "express";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController";

const router = express.Router();

router.get("/", getMovies); // Listar todos os filmes
router.post("/", addMovie); // Adicionar novo filme
router.put("/:id", updateMovie); // Atualizar filme existente
router.delete("/:id", deleteMovie); // Deletar filme

export default router;
