import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssignmentList from "./components/AssignmentList";
import Blog from "./components/Blog";
import Board from "./components/board";
import CourseSelector from "./components/Discussion/courses-list/CourseSelector";
import DiscussionForum from "./components/Discussion/forum/DiscussionForum";
import DiscussionForumDetails from "./components/Discussion/forum/DiscussionForumDetails";
import DiscussionForumEditor from "./components/Discussion/forum/DiscussionForumEditor";
import ForgotPassword from "./components/ForgotPassword";
import LangingPage from "./components/LandingPage";
import Login from "./components/Login";
import { Messaging } from "./components/Messaging/Messaging";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import QuizList from "./components/QuizList";
import ResetPassword from "./components/ResetPassword";
import Review from "./components/Review";
import Signup from "./components/SignUp";
import Upload from "./components/Upload";
import DiscussionLayout from "./views/discussion/DiscussionLayout";
import CourseLayout from "./views/layout/CourseLayout";
import MasterLayout from "./views/layout/MasterLayout";
import MessagingLayout from "./views/messaging/MessagingLayout";
import ArchivedCoursesDashboard from "./views/pages/ArchivedCoursesDashboard";
import CourseDetails from "./views/pages/CourseDetails";
import HomeDashboard from "./views/pages/HomeDashboard";
import MyCoursesDashboard from "./views/pages/MyCoursesDashboard";
import RecommendedCoursesDashboard from "./views/pages/RecommendedCoursesDashboard";
import RecommendedTutorsDashboard from "./views/pages/RecommendedTutorsDashboard";

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
                    <Route path="my-courses" element={<MyCoursesDashboard />} />
                    <Route path="my-courses/upload" element={<Upload />} />
                    <Route path="archived-courses" element={<ArchivedCoursesDashboard />} />
                    <Route path="recommended-courses" element={<RecommendedCoursesDashboard />} />
                    <Route path="recommended-tutors" element={<RecommendedTutorsDashboard />} />
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
                </Route>
                <Route path="courses" element={<CourseLayout />}>
                    <Route path=":id" element={<CourseDetails />}></Route>
                    {/* <Route index path="quiz" element={<QuizList />} /> */}
                    <Route path=":id/quiz" element={<QuizList />} />
                    <Route path=":id/quiz/:id" element={<Quiz />} />
                    <Route path=":id/assignments" element={<AssignmentList />} />
                    <Route path=":id/leaderboard" element={<Board />} />
                    <Route path=":id/review" element={<Review />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
