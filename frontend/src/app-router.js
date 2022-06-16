import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Content from "./components/Content";
import AppLayout from "./views/layout/AppLayout";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import AssignmentList from "./components/AssignmentList";

const AppRoutes = (props) => {
    return (
        <Router basename={process.env.REACT_APP_BASE_HREF}>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Content />} />
                    <Route path="/home" element={<Content />} />
                    <Route path="/course/quiz" element={<QuizList />} />
                    <Route path="/course/quiz/:id" element={<Quiz />} />
                    <Route path="/course/assignments" element={<AssignmentList />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
