import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";

export const PublicLayout = () => {
  /* -------------------------------------------------------------------------- */
  /*              OUTLET ES COMO UN CHILDREN, PARA RENDERIZAR CADA              */
  /*                      ROUTE QUE ENVUELVA PUBLICLAYOUT                       */
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
