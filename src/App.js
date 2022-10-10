import "./App.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home";
import Search from "./components/Pages/Search";
import Layouts from "./components/Layouts/Layouts";
import FormSignIn from "./components/Form/FormSignIn";
import FormSignUp from "./components/Form/FormSignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layouts />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Route>
          <Route path="/signin" element={<FormSignIn />} />
          <Route path="/signup" element={<FormSignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
