import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import NotesList from "./pages/NotesList";
import NoteDetail from "./pages/NoteDetail";
import NoteForm from "./pages/NoteForm";
import NotFound from "./pages/NotFound";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <NotesProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<NotesList />} />
            <Route path="nueva" element={<NoteForm />} />
            <Route path=":id" element={<NoteDetail />} />
            <Route path=":id/editar" element={<NoteForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HashRouter>
    </NotesProvider>
  );
}

export default App;
