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
import TCourseCard from "../../components/TCourseCard";
import TSearchBar from "../../components/TSearchBar";
import { useParams } from "react-router";

export default function CourseDetails() {
    const isTutor = localStorage.getItem('isTutor')?localStorage.getItem('isTutor')==='true':true;
    const { id } = useParams();
    console.log(id);
    const dummy_data = [
        {
            "id": "0F8JIqi4zwvb77FGz6Wt",
            "courseName": "Web Development",
            "tutorName": "Dr. Arshdeep Bree",
            "description": "This is a web development course.",
            "cost": "25 USD",
            "rating": 4,
            "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
            "id": "0F8JIqi4zwvb77FGz6Wr",
            "courseName": "Web Development",
            "tutorName": "Dr. Arshdeep Bree",
            "description": "This is a web development course.",
            "cost": "25 USD",
            "rating": 4,
            "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
            "id": "0F8JIqi4zwvb77FGz6Ws",
            "courseName": "Web Development",
            "tutorName": "Dr. Arshdeep Bree",
            "description": "This is a web development course.",
            "cost": "25 USD",
            "rating": 4,
            "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
            "id": "0F8JIqi4zwvb77FGz6Wp",
            "courseName": "Web Development",
            "tutorName": "Dr. Arshdeep Bree",
            "description": "This is a web development course.",
            "cost": "25 USD",
            "rating": 4,
            "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
        },
        {
            "id": "0F8JIqi4zwvb77FGz6Wa",
            "courseName": "Web Development",
            "tutorName": "Dr. Arshdeep Bree",
            "description": "This is a web development course.",
            "cost": "25 USD",
            "rating": 4,
            "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
        }
    ];

    let courseDetail = dummy_data.filter(course => course.id===id);
    console.log(courseDetail)
    


    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <AppBar
                position="static"
                color="default"
                elevation={0}
                sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)", padding: 3 }}
            >
                <Toolbar>
                    <Grid container spacing={1}>
                        {courseDetail.map((value, key) => (
                            <Grid item xs={12} sm={6} md={3} key={key}>
                                <TCourseCard
                                    key={key}
                                    courseName={value.courseName}
                                    tutorName={value.tutorName}
                                    description={value.description}
                                    cost={value.cost}
                                    rating={value.rating}
                                    imageURL={value.imageURL}
                                    id={value.id}
                                ></TCourseCard>
                            </Grid>
                        ))}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Paper>
    );
}
