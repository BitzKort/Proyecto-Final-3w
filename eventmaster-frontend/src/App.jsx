import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavigationBar/Navbar.jsx";
import Register from "./components/Register/Register.jsx";
import Home from "./components/Home/Home.jsx";
import LoginUser from "./components/Login.jsx";
import ProtectedRoute from "./components/Auth/ProtectedRoute.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import ProfileConfig from "./components/Profile/ProfileConfig.jsx";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword.jsx";
import Footer from "./components/Footer.jsx";
import { UserDataProvider } from "./components/Profile/UserDataProvider.jsx";
import { EventUserProvider } from "./components/Dashboard/Events/EventUserProvider.jsx";
import { EventsProvider } from "./components/Dashboard/Events/EventsProvider.jsx";
import { PlacesProvider } from "./components/Dashboard/Places/PlacesProvider.jsx";
import { RecoverToken } from "./components/RecoverPassword/RecoverToken.jsx";
import { RecoverPasswordProvider } from "./components/RecoverPassword/RecoverPasswordProvider.jsx";
import EventUserProfile from "./components/Dashboard/Events/EventUserProfile.jsx";
import ChangePass from "./components/RecoverPassword/RecoverPassword.jsx";

function App() {
  return (
    <RecoverPasswordProvider>
      <EventUserProvider>
        <UserDataProvider>
          <EventsProvider>
            <PlacesProvider>
              <Navbar />
              <BrowserRouter>
                <Routes>
                  <Route index element={<Home />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<LoginUser />} />
                  <Route
                    path="/recoverpassword"
                    element={<RecoverPassword />}
                  />
                  <Route path="/change-pass" element={<ChangePass />} />
                  <Route path="/recovertoken" element={<RecoverToken />} />
                  <Route
                    path="/evento/usuario/"
                    element={
                      <ProtectedRoute
                        isLoggedIn={localStorage.getItem("token")}
                      >
                        <EventUserProfile />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/profile/config"
                    element={
                      <ProtectedRoute
                        isLoggedIn={localStorage.getItem("token")}
                      >
                        <ProfileConfig />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute
                        isLoggedIn={localStorage.getItem("token")}
                      >
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  ></Route>
                  <Route path="*" element={<h1>Not found</h1>} />
                </Routes>
              </BrowserRouter>
              <Footer />
            </PlacesProvider>
          </EventsProvider>
        </UserDataProvider>
      </EventUserProvider>
    </RecoverPasswordProvider>
  );
}

export default App;
