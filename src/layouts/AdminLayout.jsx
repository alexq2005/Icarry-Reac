import { Outlet } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                         ADMIN SIN HEADER NI FOOTER                         */
/* -------------------------------------------------------------------------- */
export const AdminLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
