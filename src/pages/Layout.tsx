import { Outlet, Link } from "react-router-dom";
import { IconPlus } from "../components/icons";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#5561f6] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            NotesApp
          </Link>
          <nav>
            <Link
              to="nueva"
              className="btn flex gap-0.5  bg-green-600 hover:bg-green-500"
            >
              <IconPlus />
              Nueva Nota
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
