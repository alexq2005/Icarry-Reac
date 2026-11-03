/* -------------------------------------------------------------------------- */
/*                             RUTAS DE LA TIENDA                             */
/* -------------------------------------------------------------------------- */

import { Navigate, Route, Routes } from "react-router-dom";
/* -------------------------------------------------------------------------- */
/*                          TOASTIFY PARA LOS AVISOS                          */
/* -------------------------------------------------------------------------- */
import { ToastContainer } from "react-toastify";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { PublicLayout } from "./layouts/PublicLayout";
import { NotFound } from "./components/NotFound/NotFound";
import { OrderListContainer } from "./components/adminComponents/OrderList/OrderListContainer";
import { AdminLayout } from "./layouts/AdminLayout";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { DashboardFull } from "./components/adminComponents/opcionales/DashboardFull/DashboardFull";
import { ProductAdminListContainer } from "./components/adminComponents/opcionales/ProductAdminList/ProductAdminListContainer";
import { ProductFormContainerDual } from "./components/adminComponents/opcionales/ProductFormDual/ProductFormContainerDual";

function App() {
  return (
    <>
      {/* -------------------------------------------------------------------------- */}
      {/*                     RUTAS PUBLICAS CON HEADER Y FOOTER                     */}
      {/* -------------------------------------------------------------------------- */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />
          {/* -------------------------------------------------------------------------- */}
          {/*                     FILTRO POR CATEGORIA DESDE LA URL                      */}
          {/* -------------------------------------------------------------------------- */}
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartView />} />
          {/* -------------------------------------------------------------------------- */}
          {/*                    SI LA RUTA NO EXISTE MUESTRO EL 404                     */}
          {/* -------------------------------------------------------------------------- */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        {/* -------------------------------------------------------------------------- */}
        {/*                       PANEL DE ADMIN, SOLO CON LOGIN                       */}
        {/* -------------------------------------------------------------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* -------------------------------------------------------------------------- */}
          {/*                  SI ENTRA A /ADMIN LO MANDO AL DASHBOARD                   */}
          {/* -------------------------------------------------------------------------- */}
          <Route index element={<Navigate to={"dashboard"} />} />
          {/*<Route path="dasboard" element={<Dashboard/>}*/}
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />
          <Route path="orders" element={<OrderListContainer />} />

          {/* -------------------------------------------------------------------------- */}
          {/*                         PAGINAS DEL PANEL DE ADMIN                         */}
          {/* -------------------------------------------------------------------------- */}
        
          <Route path="dashboard" element={<DashboardFull />} />
          <Route path="products" element={<ProductAdminListContainer />} />
          <Route
            path="products/edit/:id"
            element={<ProductFormContainerDual />}
          />
        </Route>
      </Routes>
      {/* -------------------------------------------------------------------------- */}
      {/*                      ACA SALEN LOS AVISOS DEL CARRITO                      */}
      {/* -------------------------------------------------------------------------- */}
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
