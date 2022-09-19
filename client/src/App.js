import "./App.css";
import Landing from "./components/Layout/Landing";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Layout/auth/Register";
import Login from "./components/Layout/auth/Login";
//REdux
import {Provider} from 'react-redux';
import store from "./store";



const App = () => {
  return (
    <Provider store ={store}>
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
    </Provider>
  );
};

export default App;
