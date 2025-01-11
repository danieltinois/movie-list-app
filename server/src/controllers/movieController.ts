import { Request, Response } from "express";
import Movie from "../models/movieModel";

// Listar Filmes (getMovies)

export const getMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filmes", error });
  }
};

// Adicionar Filme (addMovie):

export const addMovie = async (req: Request, res: Response) => {
  const { title, author, genre, watched } = req.body;

  try {
    const newMovie = new Movie({ title, author, genre, watched });
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: "Erro ao adicionar filme", error });
  }
};

// Atualizar Filme (updateMovie):

export const updateMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, genre, watched } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, author, genre, watched },
      { new: true }
    );
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar filme", error });
  }
};

// Deletar Filme (deleteMovie):

export const deleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Movie.findByIdAndDelete(id);
    res.status(200).json({ message: "Filme deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar filme", error });
  }
};
