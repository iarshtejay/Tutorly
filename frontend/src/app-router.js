import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import AppLayout from "./views/layout/AppLayout";
import HomeDashboard from "./views/pages/HomeDashboard";
import HomeLayout from "./views/layout/HomeLayout";
import CoursesDashboard from "./views/pages/CourseDashboard";
import CourseDetails from "./views/pages/CourseDetails";
import NotFound from "./components/NotFound";

const AppRoutes = (props) => {
  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Content />} />
        </Route>
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<HomeDashboard />} />
        </Route>
        <Route path="/courses" element={<HomeLayout />}>
          <Route index element={<CoursesDashboard />} />
          <Route path=":id" element={<CourseDetails />} />
        </Route>
        <Route path="*" element={<HomeLayout/>}>
          <Route index element={<NotFound/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
