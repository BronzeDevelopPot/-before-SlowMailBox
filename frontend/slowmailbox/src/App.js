import Main from "./component/main/main";
import Login from "./component/login/login";
import Letter from "./component/letter/letter";
import Mail from "./component/mail/mail";
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
          <Route path="/mail" element={<Mail />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
