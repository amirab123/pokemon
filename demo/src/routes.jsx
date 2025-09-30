import { Routes, Route } from "react-router-dom";

import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import AddFavorite from "./pages/AddFavorite";
import Erreur from "./pages/Erreur";
import RoutePrivee from "./composants/RoutePrivee";
import AuthentificationGoogle from "./pages/AuthentificationGoogle";
import Acceuil from "./pages/Acceuil";

import Logout from "./pages/Logout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Acceuil />} />
      <Route path="/pokemon/:id" element={<Detail />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
        <Route path="/google" element={<AuthentificationGoogle />} />
      <Route path="/add-favorite" element={
        <RoutePrivee requireSubscription={true}>
          <AddFavorite />
        </RoutePrivee>
      }/>

      <Route path="/favorites" element={
        <RoutePrivee requireSubscription={true}>
          <Favorite />
        </RoutePrivee>
      }/>

      <Route path="*" element={<Erreur />} />
    </Routes>
  );
}
