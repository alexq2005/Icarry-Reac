/* En este componente organizo las partes principales y las rutas de la tienda. */

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductFormContainer";
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
      {/* ----------------------RUTAS PUBLICAS -------------------------*/}
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<ItemListContainer />} />
          {/* Ruta opcional para filtrar categorias */}
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<CartView />} />
          {/* cualquier ruta que no existe */}
          <Route path="*" element={<NotFound />} />
        </Route>

{/* IMPORTAR EL COMPONENTE LOGIN */}

        <Route path="/admin/login" element={<Login />} />

        {/* -----------------------------ADMIN--------------------------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/*-------------- RUTAS ADMIN----------------*/}
          {/* Si el admin esta logeado, redirige a la ruta /admin/dashboard */}
          <Route index element={<Navigate to={"dashboard"} />} />
          {/*<Route path="dasboard" element={<Dashboard/>}*/}
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess />} />
          <Route path="orders" element={<OrderListContainer />} />

          {/* Opcionales */}
        
          <Route path="dashboard" element={<DashboardFull />} />
          <Route path="products" element={<ProductAdminListContainer />} />
          <Route
            path="products/edit/:id"
            element={<ProductFormContainerDual />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
