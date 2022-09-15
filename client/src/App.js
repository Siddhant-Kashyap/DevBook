import "./App.css";
import Landing from "./components/Layout/Landing";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Layout/auth/Register";
import Login from "./components/Layout/auth/Login";



const App = () => {
  return (
    <Router>
      <>
        <Navbar />
     
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="register" element={<Register/>} />
          <Route exact path="login" element={<Login/>} />
          {/* </section> */}
        </Routes>
      </>
    </Router>
  );
};

export default App;
