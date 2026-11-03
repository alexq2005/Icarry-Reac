import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ADMIN_UID = "pdLCW6RDhTb741bri5aILtJkpII2";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                       ESPERO A SABER SI HAY USUARIO                        */
  /* -------------------------------------------------------------------------- */
  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/admin/login" />;

  const esAdmin = user.uid === ADMIN_UID;

  if (!esAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ unauthorized: true, authenticatedUid: user.uid }}
      />
    );
  }

  return children;
};
