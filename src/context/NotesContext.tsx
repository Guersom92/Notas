import { createContext, useEffect, useState } from "react";
import { Note, NoteFormData } from "../types/Note";

type NotesContextType = {
  notes: Note[];
  addNote: (note: NoteFormData) => void;
  updateNote: (id: string, note: NoteFormData) => void;
  deleteNote: (id: string) => void;
  getNote: (id: string) => Note | undefined;
};

export const NotesContext = createContext<NotesContextType | undefined>(
  undefined
);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Note[]>(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes);
      return parsedNotes.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: NoteFormData) => {
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };
  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  const updateNote = (id: string, note: NoteFormData) => {
    setNotes((preNotes) => {
      return preNotes.map((n) =>
        n.id === id ? { ...n, ...note, updatedAt: new Date() } : n
      );
    });
  };
  const deleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{ notes, addNote, updateNote, deleteNote, getNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
