"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function EditMovie({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/movies/${params.id}`
        );
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setAuthor(response.data.author);
      } catch (error) {
        console.error(error);
        alert("Erro ao buscar filme.");
      }
    };

    fetchMovie();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/movies/${params.id}`, {
        title,
        genre,
        author,
      });
      alert("Filme atualizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error(error);
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
