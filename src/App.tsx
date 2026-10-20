import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./pages/Home";
import Listitem from "./components/Listitem";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
              <Listitem />
            </>
          }
        />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </>
  );
}

export default App;