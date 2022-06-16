import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import AppLayout from "./views/layout/AppLayout";
import HomeDashboard from "./views/pages/HomeDashboard";
import HomeLayout from "./views/layout/HomeLayout";
import MyCoursesDashboard from "./views/pages/MyCoursesDashboard";
import ArchivedCoursesDashboard from "./views/pages/ArchivedCoursesDashboard";
import RecommendedCoursesDashboard from "./views/pages/RecommendedCoursesDashboard";

const AppRoutes = (props) => {
  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Content />} />
        </Route>
        <Route path="/home" element={<HomeLayout />}>
          <Route index element={<HomeDashboard />} />
          <Route path="/home/my-courses" element={<MyCoursesDashboard />} />
          <Route path="/home/archived-courses" element={<ArchivedCoursesDashboard />} />
          <Route path="/home/recommended-courses" element={<RecommendedCoursesDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
