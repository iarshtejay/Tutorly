import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import TSearchBar from "../../components/TSearchBar";
import { useLocation, useParams } from "react-router";
import CourseDetailsHeading from "../../components/CourseDetailsHeading";
import CourseBanner from "../../components/CourseBanner";
export default function CourseDetails() {
    const isTutor = localStorage.getItem("isTutor") ? localStorage.getItem("isTutor") === "true" : true;
    const { id } = useParams();
    const [courseDetail, setCourseDetail] = useState({
        id: "0F8JIqi4zwvb77FGz6Wt",
        courseName: "Web Development",
        tutorName: "Dr. Arshdeep Bree",
        description: "This is a web development course.",
        cost: "25 USD",
        rating: 4,
        imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    });
    console.log(id);
    const dummy_data = [
        {
            id: "0F8JIqi4zwvb77FGz6Wt",
            courseName: "Web Development",
            tutorName: "Dr. Arshdeep Bree",
            description: "This is a web development course.",
            cost: "25 USD",
            rating: 4,
            imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
        },
        {
            id: "0F8JIqi4zwvb77FGz6Wr",
            courseName: "Web Development",
            tutorName: "Dr. Arshdeep Bree",
            description: "This is a web development course.",
            cost: "25 USD",
            rating: 4,
            imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
        },
        {
            id: "0F8JIqi4zwvb77FGz6Ws",
            courseName: "Web Development",
            tutorName: "Dr. Arshdeep Bree",
            description: "This is a web development course.",
            cost: "25 USD",
            rating: 4,
            imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
        },
        {
            id: "0F8JIqi4zwvb77FGz6Wp",
            courseName: "Web Development",
            tutorName: "Dr. Arshdeep Bree",
            description: "This is a web development course.",
            cost: "25 USD",
            rating: 4,
            imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
        },
        {
            id: "0F8JIqi4zwvb77FGz6Wa",
            courseName: "Web Development",
            tutorName: "Dr. Arshdeep Bree",
            description: "This is a web development course.",
            cost: "25 USD",
            rating: 4,
            imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
        },
    ];
    // const location = useLocation();
    useEffect(() => {
        setCourseDetail(dummy_data.filter((course) => course.id === id)[0]);
        console.log(dummy_data.filter((course) => course.id === id)[0]);
    }, []);
    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden", padding: 2 }}>
            <CourseDetailsHeading heading={courseDetail.courseName}></CourseDetailsHeading>
            <CourseBanner category={courseDetail.description} image={courseDetail.imageURL}></CourseBanner>
        </Paper>
    );
}
