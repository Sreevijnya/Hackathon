import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Sub from "./components/Main/ind";
import Adduser from "./components/add";
import Main2 from "./components/Main/dash index";
import InitDash from "./components/Main/dashboard";
import InitDash2 from "./components/Main/dash index2";

function App() {
  const user = localStorage.getItem("token");
  const admin = localStorage.getItem("token1");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Sub />} />}
      {admin && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      {admin && (
        <Route path="/dash" exact element={<InitDash></InitDash>}></Route>
      )}
      {admin && (
        <Route path="/dash2" exact element={<InitDash2></InitDash2>}></Route>
      )}
      <Route path="/" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
