import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TCourseCard from "../../components/TCourseCard";
import TSearchBar from "../../components/TSearchBar";
import { Pagination, Typography } from "@mui/material";
import { getAllCourses } from "./services/courses-rest";
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchCourses } from "./slice/courseSlice";

export default function HomeDashboard() {
    // const dummy_data = [
    //     {
    //         id: "0F8JIqi4zwvb77FGz6Wt",
    //         courseName: "Web Development",
    //         tutorName: "Dr. Arshdeep Bree",
    //         description: "This is a web development course.",
    //         cost: "25 USD",
    //         rating: 4,
    //         imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    //     },
    //     {
    //         id: "0F8JIqi4zwvb77FGz6Wt",
    //         courseName: "Android Development",
    //         tutorName: "Dr. Arshdeep Bree",
    //         description: "This is a web development course.",
    //         cost: "25 USD",
    //         rating: 4,
    //         imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    //     },
    //     {
    //         id: "0F8JIqi4zwvb77FGz6Wt",
    //         courseName: "App Development",
    //         tutorName: "Dr. Arshdeep Bree",
    //         description: "This is a web development course.",
    //         cost: "25 USD",
    //         rating: 4,
    //         imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    //     },
    //     {
    //         id: "0F8JIqi4zwvb77FGz6Wt",
    //         courseName: "React",
    //         tutorName: "Dr. Arshdeep Bree",
    //         description: "This is a web development course.",
    //         cost: "25 USD",
    //         rating: 4,
    //         imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    //     },
    //     {
    //         id: "0F8JIqi4zwvb77FGz6Wt",
    //         courseName: "Front-end Development",
    //         tutorName: "Dr. Arshdeep Bree",
    //         description: "This is a web development course.",
    //         cost: "25 USD",
    //         rating: 4,
    //         imageURL: "https://randomuser.me/api/portraits/men/81.jpg",
    //     },
    // ];

    const dispatch = useDispatch();
    const allCourses =  useSelector(state => state.course.allCourses);
    const showCourses = useSelector(state => state.course.searchCourses);
    const [searchTerm, setSearchTerm] = useState("");
  
    useEffect(() => {
      dispatch(getAllCourses({ isTutor: false }));
    }, [dispatch]);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    useEffect(() => {
        if (searchTerm !== "" && searchTerm !== null && searchTerm !== undefined) {
            const selectedCourses = allCourses.data.filter((x) => {
                for (var i in x) {
                    if (i === "name" || i === "description" || i === "tutor") {
                        if (x[i].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
                            return x;
                    }
                }
            });
            dispatch(updateSearchCourses(selectedCourses));
        } else {
            dispatch(getAllCourses({ isTutor: false }));
        }
    }, [searchTerm]);

    return (
        <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
            <TSearchBar
                handleSearch={handleSearch}
                placeHolderText={"Search by course name or tutor name"}
            ></TSearchBar>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                {showCourses?.data?.length > 0 ? (
                    showCourses?.data?.map((value, key) => (
                        <Grid item xs={12} sm={6} md={4} key={key}>
                            <TCourseCard
                                key={key}
                                courseId={value._id}
                                courseName={value.name}
                                tutorName={value.tutor?.name}
                                description={value.description}
                                cost={value.cost}
                                rating={value.rating}
                                imageURL={value.imageURL}
                            ></TCourseCard>
                        </Grid>
                    ))
                ) : (
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: "50vh" }}
                    >
                        <Grid item xs={3}>
                            <Typography
                                sx={{ my: 5, mx: 2 }}
                                color="text.secondary"
                                align="center"
                            >
                                No courses found.
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {showCourses?.data?.length > 0 ? (
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: "10vh" }}
                >
                    <Grid item xs={3}>
                        <Pagination count={1} />
                    </Grid>
                </Grid>
            ) : (
                <></>
            )}
        </Paper>
    );
}
