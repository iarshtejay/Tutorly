import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const rootDomain = "http://localhost:8000";

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const QuizList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const courseId = useParams().id;
    const courseId = `62ca26bd2838cca760fed1ef`;

    const studentId = `62ca2f7a4f3727bc5d9a3e98`;

    const [userType, setUserType] = useState("student");
    const [quizzes, setQuizzes] = useState([]);

    const getQuizzes = async () => {
        if (userType === "tutor") {
            const response = await axios({
                method: "GET",
                url: `${rootDomain}/api/course/${courseId}/quiz/list`,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data && response.data.data && response.data.data.length > 0) {
                return response.data.data;
            } else {
                return [];
            }
        } else {
            const response = await axios({
                method: "GET",
                url: `${rootDomain}/api/course/${courseId}/quiz/list/${studentId}`,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.data && response.data.data && response.data.data.length > 0) {
                return response.data.data;
            } else {
                return [];
            }
        }
    };

    const checkIfQuizIsActive = (quiz) => {
        if (userType === "tutor") {
            return true;
        } else {
            const now = moment();
            const startDate = moment(quiz.startDate);
            const endDate = moment(quiz.endDate);
            if (now.isAfter(startDate) && now.isBefore(endDate)) {
                return true;
            } else {
                return false;
            }
        }
    };

    useEffect(() => {
        getQuizzes().then((quizzes) => {
            setQuizzes(quizzes);
        });
    }, []);

    return (
        <>
            <Container fixed>
                {userType === "tutor" && (
                    <Box>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={(e) => {
                                const id = location.pathname.split("/")[2];
                                navigate(`/courses/${id}/quiz/new`);
                            }}
                        >
                            New Quiz
                        </Button>
                    </Box>
                )}
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                                Active Quizzes
                            </Typography>
                            {quizzes.length === 0 ? (
                                <Typography sx={{ mt: 10 }} variant="h6" component="div">
                                    No Quizzes Available
                                </Typography>
                            ) : (
                                <Demo>
                                    <List>
                                        {quizzes.map((quiz) => (
                                            <ListItem
                                                key={quiz._id}
                                                secondaryAction={
                                                    <IconButton
                                                        style={quiz.score ? { display: "none" } : {}}
                                                        disabled={!checkIfQuizIsActive(quiz)}
                                                        aria-label="Start"
                                                        onClick={(e) => {
                                                            const id = location.pathname.split("/")[2];
                                                            if (userType === "tutor") {
                                                                navigate(`/courses/${id}/quiz/${quiz._id}`);
                                                            } else {
                                                                navigate(`/courses/${id}/quiz/${quiz._id}/attempt`);
                                                            }
                                                        }}
                                                    >
                                                        <KeyboardArrowRightRoundedIcon />
                                                    </IconButton>
                                                }
                                            >
                                                <ListItemIcon>
                                                    <FolderIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={quiz.title} secondary={`Available On ${moment(quiz.startDate).format("llll")} Until ${moment(quiz.endDate).format("llll")}`} />
                                                {quiz.score && `${Math.round(quiz.score)}%`}
                                            </ListItem>
                                        ))}
                                    </List>
                                </Demo>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default QuizList;
