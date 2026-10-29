import { DashboardFullUI } from "./DashboardFullUI";
import { useAuth } from "../../../../context/AuthContext";

export const DashboardFull = () => {
  const { logout } = useAuth();

  return <DashboardFullUI onLogout={logout} />;
};
