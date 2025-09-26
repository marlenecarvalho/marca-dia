import { useState } from "react";

export default function CRUD() {
  const [tarefa, setTarefa] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tarefas, setTarefas] = useState<
    { id: number; titulo: string; descricao: string }[]
  >([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (editandoId !== null) {
      // Atualizar tarefa existente
      setTarefas((prev) =>
        prev.map((t) =>
          t.id === editandoId ? { ...t, titulo: tarefa, descricao } : t
        )
      );
      setEditandoId(null);
    } else {
      // Adicionar nova tarefa
      const novaTarefa = {
        id: Date.now(),
        titulo: tarefa,
        descricao,
      };
      setTarefas((prev) => [...prev, novaTarefa]);
    }

    setTarefa("");
    setDescricao("");
  }

  function handleEditar(id: number) {
    const tarefaEditar = tarefas.find((t) => t.id === id);
    if (!tarefaEditar) return;
    setTarefa(tarefaEditar.titulo);
    setDescricao(tarefaEditar.descricao);
    setEditandoId(id);
  }

  function handleRemover(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-8">
      <form
        onSubmit={handleSubmit}
        className="bg-blue-500 p-4 rounded-xl text-white"
      >
        <input
          type="text"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          placeholder="Tarefa"
          className="border p-2 rounded w-full mb-2 text-black"
          required
        />

        <input
          type="text"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descrição"
          className="border p-2 rounded w-full mb-2 text-black"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold"
        >
          {editandoId ? "Salvar edição" : "Adicionar"}
        </button>
      </form>

      <ul className="mt-4">
        {tarefas.map((t) => (
          <li
            key={t.id}
            className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
          >
            <div>
              <p className="font-bold">{t.titulo}</p>
              <p className="text-sm">{t.descricao}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditar(t.id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleRemover(t.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
              >
                Remover
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
