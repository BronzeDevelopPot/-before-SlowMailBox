import Main from "./component/main/main";
import Login from "./component/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
