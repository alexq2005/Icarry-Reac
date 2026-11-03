/* -------------------------------------------------------------------------- */
/*                   EN ESTE COMPONENTE ORGANIZO LAS PARTES                   */
/*                    PRINCIPALES Y LAS RUTAS DE LA TIENDA                    */
/* -------------------------------------------------------------------------- */

import { Navigate, Route, Routes } from "react-router-dom";
/* -------------------------------------------------------------------------- */
/*                            IMPORT PARA TOASTIFY                            */
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
      {/*                               RUTAS PUBLICAS                               */}
      {/* -------------------------------------------------------------------------- */}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />
          {/* -------------------------------------------------------------------------- */}
          {/*                   RUTA OPCIONAL PARA FILTRAR CATEGORIAS                    */}
          {/* -------------------------------------------------------------------------- */}
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartView />} />
          {/* -------------------------------------------------------------------------- */}
          {/*                        CUALQUIER RUTA QUE NO EXISTE                        */}
          {/* -------------------------------------------------------------------------- */}
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />

        {/* -------------------------------------------------------------------------- */}
        {/*                                   ADMIN                                    */}
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
          {/*                                RUTAS ADMIN                                 */}
          {/* -------------------------------------------------------------------------- */}
          {/* -------------------------------------------------------------------------- */}
          {/*       SI EL ADMIN ESTA LOGEADO, REDIRIGE A LA RUTA /ADMIN/DASHBOARD        */}
          {/* -------------------------------------------------------------------------- */}
          <Route index element={<Navigate to={"dashboard"} />} />
          {/*<Route path="dasboard" element={<Dashboard/>}*/}
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />
          <Route path="orders" element={<OrderListContainer />} />

          {/* -------------------------------------------------------------------------- */}
          {/*                                 OPCIONALES                                 */}
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
      {/*                    ACA APARECEN LOS AVISOS DEL CARRITO                     */}
      {/* -------------------------------------------------------------------------- */}
      <ToastContainer theme="dark" />
    </>
  );
}

export default App;
