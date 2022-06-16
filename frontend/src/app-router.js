import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import Review from "./components/Review";
import Upload from "./components/Upload";
import AppLayout from "./views/layout/AppLayout";

const AppRoutes = (props) => {
  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Content />} />
          <Route path="/home" element={<Review />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
