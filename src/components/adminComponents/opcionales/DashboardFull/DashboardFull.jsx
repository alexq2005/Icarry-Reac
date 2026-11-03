import { DashboardFullUI } from "./DashboardFullUI";
import { useAuth } from "../../../../context/AuthContext";

/* -------------------------------------------------------------------------- */
/*                         LE PASO EL LOGOUT AL PANEL                         */
/* -------------------------------------------------------------------------- */
export const DashboardFull = () => {
  const { logout } = useAuth();

  return <DashboardFullUI onLogout={logout} />;
};
