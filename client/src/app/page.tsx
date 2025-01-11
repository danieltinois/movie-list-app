"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  watched: boolean;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies");
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/movies/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id));
      alert("Filme removido com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao remover filme.");
    }
  };

  return (
    <div className="container">
      <h1>Lista de Filmes</h1>
      <Link href="/add-movie" className="btn btn-primary">
        Adicionar Filme
      </Link>
      <div className="mt-3">
        <ul className="list-group">
          {movies.map((movie) => (
            <li key={movie._id} className="list=group-item">
              <h5>{movie.title}</h5>
              <p>
                {movie.genre} | {movie.author}
              </p>
              <Link
                href={`/edit-movie/${movie._id}`}
                className="btn btn-secondary btn-sm me-2"
              >
                Editar
              </Link>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(movie._id)}
              >
                Deletar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
