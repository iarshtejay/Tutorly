import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import AppLayout from "./views/layout/AppLayout";
import Profile from "./components/Profile"
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Blog from "./components/Blog";
import LandingPage from "./components/LandingPage"

const AppRoutes = (props) => {
  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forgotPassword' element={<ForgotPassword />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/landing' element={<LandingPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Content />} />
          <Route path="/home" element={<Content />} />
          <Route index element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route index element={<Blog />} />
          <Route path="/blogs" element={<Blog />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
