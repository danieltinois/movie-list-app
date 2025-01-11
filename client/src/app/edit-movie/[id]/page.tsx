"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Usando useRouter do App Router
import { useParams } from "next/navigation"; // Para capturar parâmetros de URL

export default function EditMovie() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter(); // Usando useRouter do App Router
  const { id } = useParams(); // Captura o parâmetro 'id' da URL

  useEffect(() => {
    // Verifique se o id está disponível
    if (!id) {
      console.error("ID não encontrado");
      return;
    }

    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/movies/${id}`
        );
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setAuthor(response.data.author);
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
        alert("Erro ao buscar filme.");
      }
    };

    fetchMovie();
  }, [id]); // Adicionando id como dependência para a requisição

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      console.error("ID não encontrado");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3001/api/movies/${id}`,
        {
          title,
          genre,
          author,
        }
      );

      // Logar a resposta completa para diagnóstico
      console.log("Resposta do servidor:", response);

      alert("Filme atualizado com sucesso!");
      router.push("/"); // Redireciona para a página inicial após a atualização
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      alert("Erro ao atualizar filme.");
    }
  };

  return (
    <div className="container">
      <h1>Editar Filme</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gênero</label>
          <input
            type="text"
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Atualizar
        </button>
      </form>
    </div>
  );
}
