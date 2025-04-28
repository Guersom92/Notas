import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NotesList from "./pages/NotesList";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NotFound from "./pages/NotFound";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <NotesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NotesList />} />
            <Route path="notas/nueva" element={<NoteForm />} />
            <Route path="notas/:id" element={<NoteDetail />} />
            <Route path="notas/:id/editar" element={<NoteForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;
