import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import AssignmentList from "./components/AssignmentList";
import CourseSelector from "./components/Discussion/courses-list/CourseSelector";
import DiscussionForum from "./components/Discussion/forum/DiscussionForum";
import DiscussionForumDetails from "./components/Discussion/forum/DiscussionForumDetails";
import { Messaging } from "./components/Messaging/Messaging";
import Quiz from "./components/Quiz";
import QuizList from "./components/QuizList";
import DiscussionLayout from "./views/discussion/DiscussionLayout";
import AppLayout from "./views/layout/AppLayout";
import MessagingLayout from "./views/messaging/MessagingLayout";
import LangingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Blog from "./components/Blog";
import Profile from "./components/Profile";
import HomeDashboard from "./views/pages/HomeDashboard";
import HomeLayout from "./views/layout/HomeLayout";
import MyCoursesDashboard from "./views/pages/MyCoursesDashboard";
import ArchivedCoursesDashboard from "./views/pages/ArchivedCoursesDashboard";
import RecommendedCoursesDashboard from "./views/pages/RecommendedCoursesDashboard";
import CourseDetails from "./views/pages/CourseDetails";
import DiscussionForumEditor from "./components/Discussion/forum/DiscussionForumEditor";
import MasterLayout from "./views/layout/MasterLayout";

const AppRoutes = (props) => {

    return (
        <Router basename={process.env.REACT_APP_BASE_HREF}>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="forgotPassword" element={<ForgotPassword />} />
                <Route path="resetPassword" element={<ResetPassword />} />
                <Route path="landing" element={<LangingPage />}></Route>
                <Route path="/" element={<MasterLayout />}>
                    <Route index element={<HomeDashboard />} />
                    <Route path="courses/:id" element={<CourseDetails />}></Route>
                    <Route path="my-courses" element={<MyCoursesDashboard />} />
                    <Route path="archived-courses" element={<ArchivedCoursesDashboard />} />
                    <Route path="recommended-courses" element={<RecommendedCoursesDashboard />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="blogs" element={<Blog />} />
                    <Route index element={<MessagingLayout />} />
                    <Route path="chat" element={<MessagingLayout />}>
                        <Route index element={<Messaging />} />
                        <Route path="messages" element={<Messaging />} />
                    </Route>
                    <Route path="discussion" element={<DiscussionLayout />}>
                        <Route index element={<CourseSelector />} />
                        <Route path="courses" element={<CourseSelector />} />
                        <Route path="forum" element={<DiscussionForum />} />
                        <Route path="forum/editor" element={<DiscussionForumEditor />} />
                        <Route path="forum/:id" element={<DiscussionForumDetails />} />
                    </Route>
                    <Route path="course">
                        <Route index path="quiz" element={<QuizList />} />
                        <Route path="quiz" element={<QuizList />} />
                        <Route path="quiz/:id" element={<Quiz />} />
                        <Route path="assignments" element={<AssignmentList />} />

                        {/* <Route path="/review" element={<Review />} />

                        <Route path="/upload" element={<Upload />} /> */}
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
