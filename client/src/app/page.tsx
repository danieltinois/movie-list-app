"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Pagination } from "react-bootstrap"; // Importando componente de Paginação
import {
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaCheckCircle,
  FaRegCircle,
} from "react-icons/fa"; // Ícones

interface Movie {
  _id: string;
  title: string;
  author: string;
  genre: string;
  watched: boolean;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1); // Página atual
  const [moviesPerPage] = useState<number>(4); // Filmes por página
  const [totalMovies, setTotalMovies] = useState<number>(0); // Total de filmes

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/movies");
        setMovies(response.data);
        setTotalMovies(response.data.length); // Definir o número total de filmes
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

  const toggleWatched = async (id: string) => {
    const movie = movies.find((movie) => movie._id === id);
    if (movie) {
      try {
        const updatedMovie = { ...movie, watched: !movie.watched };
        await axios.put(`http://localhost:3001/api/movies/${id}`, updatedMovie);
        setMovies(movies.map((m) => (m._id === id ? updatedMovie : m)));
      } catch (error) {
        console.error(error);
        alert("Erro ao atualizar status do filme.");
      }
    }
  };

  // Função para filtrar filmes com base no termo de pesquisa
  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm =
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearchTerm;
  });

  // Pegar filmes da página atual
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  // Trocar a página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#ffffff" }} // Layout branco
    >
      <div className="col-12 col-md-8 col-lg-6">
        <h1 className="text-dark text-center mb-4">Lista de Filmes</h1>

        {/* Input de pesquisa */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Pesquisar por nome, autor ou gênero"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Link href="/add-movie" className="btn btn-success w-100 mb-3">
          <FaPlus className="me-2" /> Adicionar Filme
        </Link>

        {/* Lista de filmes */}
        <ul className="list-group">
          {currentMovies.map((movie) => (
            <li
              key={movie._id}
              className="list-group-item mb-2 rounded shadow-sm"
              style={{ backgroundColor: "#f8f9fa" }} // Fundo claro para os itens
            >
              <h5 className="text-dark">{movie.title}</h5>
              <p className="text-muted">
                {movie.genre} | {movie.author}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox para marcar como assistido */}
                <div
                  className="d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleWatched(movie._id)}
                >
                  {movie.watched ? (
                    <FaCheckCircle className="text-success me-2" />
                  ) : (
                    <FaRegCircle className="text-muted me-2" />
                  )}
                  <span
                    className={movie.watched ? "text-success" : "text-muted"}
                  >
                    {movie.watched ? "Assistido" : "Não Assistido"}
                  </span>
                </div>

                <div className="d-flex justify-content-end">
                  <Link
                    href={`/edit-movie/${movie._id}`}
                    className="btn btn-secondary btn-sm me-2"
                  >
                    <FaEdit className="me-1" /> Editar
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie._id)}
                  >
                    <FaTrashAlt className="me-1" /> Deletar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Paginação */}
        <div className="mt-3">
          <Pagination className="d-flex justify-content-center align-items-center">
            {[...Array(Math.ceil(filteredMovies.length / moviesPerPage))].map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
