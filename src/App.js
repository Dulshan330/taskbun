import { Route, Routes } from "react-router-dom";
import SignIn from "./Screens/Auth/signin";
import SignUp from "./Screens/Auth/signup";
import AuthDetails from "./Screens/auth_details";
import Dashboard from "./Screens/dashboard";
import ForgotPassword from "./Screens/Auth/forgotPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<ForgotPassword/>} />
      </Routes>
    </div>
  );
}

export default App;
