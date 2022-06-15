import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import AppLayout from "./views/layout/AppLayout";
import Board from "./components/board";

const AppRoutes = (props) => {
  return (
    <Router basename={process.env.REACT_APP_BASE_HREF}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Content />} />
          <Route path="/home" element={<Content />} />
        </Route>
        <Route path='/board' element = {<Board/>}/>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
