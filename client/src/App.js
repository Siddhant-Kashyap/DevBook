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
import ProfileForm from "./components/profile-forms/ProfileForm";
import AddEducation from "./components/profile-forms/AddEductaion";
import AddExperience from "./components/profile-forms/AddExperience";
import Profiles from './components/profiles/Profiles'
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";





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
            <Route exact path="/profiles" element={<Profiles />} />
            <Route exact path="/profile/:id" element={<Profile />} />

            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
              <Route
              path="/create-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
              <Route
              path="/edit-profile"
              element={<PrivateRoute component={ProfileForm} />}
            />
             <Route
              path="/add-education"
              element={<PrivateRoute component={AddEducation} />}
            />
              <Route
              path="/add-experience"
              element={<PrivateRoute component={AddExperience} />}
            />
            <Route
              path="/posts"
              element={<PrivateRoute component={Posts} />}
            />
             <Route
              path="/posts/:id"
              element={<PrivateRoute component={Post} />}
            />
            
            
          </Routes>
        </>
      </Router>
    </Provider>
  );
};

export default App;
