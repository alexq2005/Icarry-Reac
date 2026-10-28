/* En este componente organizo las partes principales y las rutas de la tienda. */

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Login } from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";
import { Products } from "./components/adminComponents/Products/Products";
import { Orders } from "./components/adminComponents/Orders/Orders";

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
{/* Si el admin esta logeado,redirige a la ruta /admin/dashboard */}

          <Route index element={<Navigate to={"dashboard"} />} />
    {/*      <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="products/new" element={<ProductFormContainer />} />
          <Route path="products/success/:id" element={<ProductSuccess/>}/>
            
          {/*Opcional*/}

          <Route path="Dashboard" element={<DashboardFull />} />
          <Route path ="producs"element={<ProductsAdmintListContainer/>}
          />
          <Route
            path="products/edit/:id"
            element={<ProductFormContainerDual />}
          />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
