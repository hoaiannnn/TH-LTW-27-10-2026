import { Routes, Route } from "react-router";

import Header from "./components/Header";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Listitem from "./components/Listitem";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Listitem />
            </>
          }
        />

        <Route
          path="/about-us"
          element={<AboutUs />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </>
  );
}

export default App;
