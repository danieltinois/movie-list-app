"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPlus, FaTag, FaArrowLeft } from "react-icons/fa"; // Ícone de adicionar e tag
import Link from "next/link";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState<string[]>([]); // Usamos um array para múltiplos gêneros
  const [author, setAuthor] = useState("");
  const [newGenre, setNewGenre] = useState(""); // Armazena o gênero sendo adicionado
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/movies", {
        title,
        genre: genres.join(", "), // Envia os gêneros como uma string separada por vírgula
        author,
      });
      alert("Filme adicionado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar filme.");
    }
  };

  const handleAddGenre = () => {
    if (newGenre && !genres.includes(newGenre)) {
      setGenres([...genres, newGenre]);
      setNewGenre(""); // Limpa o input após adicionar
    }
  };

  const handleRemoveGenre = (genre: string) => {
    setGenres(genres.filter((g) => g !== genre)); // Remove o gênero da lista
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#ffffff" }}
    >
      <div className="col-12 col-md-8 col-lg-6">
        <h1 className="text-dark text-center mb-4">Adicionar Filme</h1>

        <form
          onSubmit={handleSubmit}
          className="shadow-sm p-4 rounded"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div className="button-container">
            <Link href="/" className="btn-back">
              <FaArrowLeft className="me-2" /> Voltar
            </Link>
          </div>
          <style jsx>{`
            .button-container {
              display: flex;
              justify-content: flex-end; /* Alinha o botão à direita */
              align-items: center; /* Alinha o botão verticalmente no centro do contêiner */
              text-decoration: none;
            }

            Link {
              color: rgba(0, 0, 0, 0.5); /* Cor com opacidade */
              text-decoration: none;
            }

            .btn-back {
              text-decoration: none;
              display: flex;
              justify-content: center;
              background: none; /* Sem fundo */
              border: none; /* Sem borda */
              color: rgba(0, 0, 0, 0.5); /* Cor com opacidade */
              font-size: 16px;
              cursor: pointer;
              transition: color 0.3s ease; /* Transição suave da cor */
              align-items: center;
            }

            .btn-back:hover {
              color: black; /* Cor original ao passar o mouse */
            }

            .me-2 {
              position: absolute;
              top: 25px;
            }
          `}</style>

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

          {/* Campo de Gêneros com tags */}
          <div className="mb-3">
            <label className="form-label">Gêneros</label>
            <div className="d-flex flex-wrap gap-2">
              {genres.map((genre, index) => (
                <span
                  key={index}
                  className="badge bg-primary text-white d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveGenre(genre)} // Remove gênero ao clicar
                >
                  {genre} <FaTag className="ms-2" />
                </span>
              ))}
            </div>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Adicionar gênero"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleAddGenre} // Adiciona o gênero ao clicar no botão
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Campo de Autor */}
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

          <button type="submit" className="btn btn-success w-100">
            <FaPlus className="me-2" /> Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
