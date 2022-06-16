import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseSelector from "./components/Discussion/courses-list/CourseSelector";
import DiscussionForum from "./components/Discussion/forum/DiscussionForum";
import DiscussionForumDetails from "./components/Discussion/forum/DiscussionForumDetails";
import { Messaging } from "./components/Messaging/Messaging";
import DiscussionLayout from "./views/discussion/DiscussionLayout";
import AppLayout from "./views/layout/AppLayout";
import QuizList from "./components/QuizList";
import Quiz from "./components/Quiz";
import AssignmentList from "./components/AssignmentList";
import MessagingLayout from "./views/messaging/MessagingLayout";

const AppRoutes = (props) => {
    return (
        <Router basename={process.env.REACT_APP_BASE_HREF}>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<MessagingLayout />} />
                    <Route path="chat" element={<MessagingLayout />}>
                        <Route index element={<Messaging />} />
                        <Route path="messages" element={<Messaging />} />
                    </Route>
                    <Route path="discussion" element={<DiscussionLayout />}>
                        <Route index element={<CourseSelector />} />
                        <Route path="courses" element={<CourseSelector />} />
                        <Route path="forum" element={<DiscussionForum />} />
                        <Route path="forum/:id" element={<DiscussionForumDetails />} />
                    </Route>
                    <Route path="/course/quiz" element={<QuizList />} />
                    <Route path="/course/quiz/:id" element={<Quiz />} />
                    <Route path="/course/assignments" element={<AssignmentList />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
