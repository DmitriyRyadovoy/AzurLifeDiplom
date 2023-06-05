import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import Catalog from './pages/Catalog';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/register';
import Login from './pages/Auth/login'
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import Admin from "./pages/Admin/AdminDashboard";
import AdminCreateCategory from "./pages/Admin/AdminCreateCategory";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminProducts from "./pages/Admin/AdminProducts";
import UserOrdes from "./pages/user/UserOrdes";
import AdminUpdateProduct from "./pages/Admin/AdminUpdateProduct";
import ProductsDetails from "./pages/ProductsDetails";
import NewProduct from "./pages/NewProduct";
import FavoritesPage from "./pages/FavoritesPage";
import MyProduct from "./pages/MyProduct";
import UserDetails from "./pages/UserDetails";
import AdminUserDetails from "./pages/Admin/AdminUserDetails";
import EditProduct from "./pages/EditProduct";
const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/place-an-ad" element={<NewProduct />} />
        <Route path="/product/:slug" element={<ProductsDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/my-product" element={<MyProduct />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/product/edit-product/:slug" element={< EditProduct />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<UserOrdes />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={< Admin />} />
          <Route path="admin/create-category" element={< AdminCreateCategory />} />
          <Route path="admin/product/:slug" element={< AdminUpdateProduct />} />
          <Route path="admin/products" element={< AdminProducts />} />
          <Route path="admin/users" element={< AdminUsers />} />
          <Route path="admin/get-user/:id" element={<AdminUserDetails />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default Router;