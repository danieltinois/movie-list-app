"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaPlus, FaTag } from "react-icons/fa"; // Ícone de adicionar e tag

export default function EditMovie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [title, setTitle] = useState("");
  const [genres, setGenres] = useState<string[]>([]); // Usamos um array para múltiplos gêneros
  const [author, setAuthor] = useState("");
  const [newGenre, setNewGenre] = useState(""); // Armazena o gênero sendo adicionado
  const router = useRouter();

  // Desembrulhando os parâmetros usando React.use()
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getParams = async () => {
      const paramsData = await params; // Obtém os parâmetros resolvidos
      setId(paramsData.id); // Define o id extraído do params
    };

    getParams();
  }, [params]);

  useEffect(() => {
    if (!id) {
      console.error("ID não encontrado");
      return;
    }

    const fetchMovie = async () => {
      try {
        // Buscando dados do filme na API
        const response = await axios.get(
          `http://localhost:3001/api/movies/${id}`
        );
        const movieData = response.data;
        setTitle(movieData.title);
        setGenres(movieData.genre.split(", ")); // Divide a string de gêneros em um array
        setAuthor(movieData.author);
      } catch (error) {
        console.error("Erro ao buscar filme:", error);
        alert("Erro ao buscar filme.");
      }
    };

    fetchMovie();
  }, [id]); // Adicionando id como dependência para a requisição

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Atualizando os dados do filme na API
      await axios.put(`http://localhost:3001/api/movies/${id}`, {
        title,
        genre: genres.join(", "), // Envia os gêneros como uma string separada por vírgula
        author,
      });
      alert("Filme atualizado com sucesso!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar filme.");
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
        <h1 className="text-dark text-center mb-4">Editar Filme</h1>

        <form
          onSubmit={handleSubmit}
          className="shadow-sm p-4 rounded"
          style={{ backgroundColor: "#f8f9fa" }}
        >
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
            <FaPlus className="me-2" /> Atualizar
          </button>
        </form>
      </div>
    </div>
  );
}
