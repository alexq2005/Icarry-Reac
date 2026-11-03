import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const PublicLayout = () => {
  /* -------------------------------------------------------------------------- */
  /*              OUTLET MUESTRA CADA PAGINA ENTRE HEADER Y FOOTER              */
  /* -------------------------------------------------------------------------- */
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
