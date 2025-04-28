import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useNotes } from "../hooks/useNotes";
import { NoteFormData } from "../types/Note";

const NoteForm = () => {
  const { id } = useParams<{ id: string }>();
  const { addNote, updateNote, getNote } = useNotes();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (isEditMode && id) {
      const note = getNote(id);
      if (note) {
        setFormData({
          title: note.title,
          content: note.content,
        });
      } else {
        navigate("/");
      }
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      content: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "El título es obligatorio";
      isValid = false;
    }

    if (!formData.content.trim()) {
      newErrors.content = "El contenido es obligatorio";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (isEditMode && id) {
      updateNote(id, formData);
    } else {
      addNote(formData);
    }

    navigate("/");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        {isEditMode ? "Editar Nota" : "Crear Nueva Nota"}
      </h1>

      <form onSubmit={handleSubmit} className="card">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input ${errors.title ? "border-red-500" : ""}`}
            placeholder="Título de la nota"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block mb-1 font-medium">
            Contenido
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className={`input min-h-32 ${
              errors.content ? "border-red-500" : ""
            }`}
            placeholder="Escribe el contenido de tu nota aquí..."
            rows={10}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn btn-primary flex-1">
            {isEditMode ? "Actualizar" : "Crear"} Nota
          </button>
          <Link
            to="/"
            className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 flex-1 text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
