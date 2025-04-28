import { Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { IconEdit, IconEye, IconTrash } from "../components/icons";

const NotesList = () => {
  const { notes, deleteNote } = useNotes();

  // Ordenar notas por fecha de actualización (más reciente primero)
  const sortedNotes = [...notes].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  if (sortedNotes.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No hay notas todavía</h2>
        <p className="mb-6 text-gray-600">Comienza creando tu primera nota</p>
        <Link to="/notas/nueva" className="btn btn-primary">
          Crear Nota
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Notas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedNotes.map((note) => (
          <div key={note.id} className="card hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-2 truncate">{note.title}</h2>
            <p className="text-gray-600 mb-4 h-12 overflow-hidden">
              {note.content.substring(0, 100)}
              {note.content.length > 100 ? "..." : ""}
            </p>
            <div className="text-xs text-gray-500 mb-4">
              Actualizada: {new Date(note.updatedAt).toLocaleDateString()}
            </div>
            <div className="flex gap-2">
              <Link
                to={`/notas/${note.id}`}
                className="btn flex gap-2 text-white justify-center bg-green-600  hover:bg-green-700 flex-1 text-center"
              >
                <IconEye />
                Ver
              </Link>
              <Link
                to={`/notas/${note.id}/editar`}
                className="btn btn-primary flex gap-2 justify-center text-white   flex-1 text-center"
              >
                <IconEdit />
                Editar
              </Link>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "¿Estás seguro de que quieres eliminar esta nota?"
                    )
                  ) {
                    deleteNote(note.id);
                  }
                }}
                className="btn flex gap-2 justify-center btn-danger flex-1"
              >
                <IconTrash />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesList;
