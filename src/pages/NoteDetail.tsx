import { useParams, Link, useNavigate } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getNote, deleteNote } = useNotes();
  const navigate = useNavigate();

  if (!id) {
    return <div>Error: No se proporcionó un ID de nota</div>;
  }

  const note = getNote(id);

  if (!note) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Nota no encontrada</h2>
        <p className="mb-6 text-gray-600">
          La nota que buscas no existe o ha sido eliminada
        </p>
        <Link to="/Notas" className="btn btn-primary">
          Volver a la lista
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
      deleteNote(note.id);
      navigate("/Notas");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold truncate">{note.title}</h1>
        <div className="flex gap-2">
          <Link
            to={`editar`}
            className="btn btn-primary text-white "
          >
            Editar
          </Link>
          <button onClick={handleDelete} className="btn btn-danger">
            Eliminar
          </button>
        </div>
      </div>

      <div className="card mb-6">
        <p className="whitespace-pre-wrap  ">{note.content}</p>
      </div>

      <div className="text-gray-500 text-sm">
        <p>Creada: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Última actualización: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>

      <div className="mt-8">
        <Link
          to="/Notas"
          className="btn bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Volver a la lista
        </Link>
      </div>
    </div>
  );
};

export default NoteDetail;
