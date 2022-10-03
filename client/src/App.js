import "./App.css";
import Landing from "./components/Layout/Landing";
import Navbar from "./components/Layout/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Layout/auth/Register";
import Login from "./components/Layout/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
//REdux
import { Provider } from "react-redux";
import store from "./store";
// import Alert from "./components/Layout/Alert";
import { loadUser } from "./action/auth";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/Layout/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";


if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          {/* <Alert/> */}

          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="register" element={<Register />} />
            <Route exact path="login" element={<Login />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
              <Route
              path="/create-profile"
              element={<PrivateRoute component={CreateProfile} />}
            />
            
          </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
