"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";

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
    axios
      .get("http://localhost:3001/api/movies")
      .then((response) => setMovies(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h1>Lista de Filmes</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            {movie.title} - {movie.genre} - {movie.author} - {movie.watched}
          </li>
        ))}
      </ul>
    </div>
  );
}
