import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Página no encontrada</h2>
      <p className="text-gray-600 mb-8">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link to="/" className="btn btn-primary">
        Volver a la página principal
      </Link>
    </div>
  );
};

export default NotFound;
