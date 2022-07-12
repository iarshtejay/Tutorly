import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QuizQuestion from "./QuizQuestion";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import SaveIcon from "@mui/icons-material/Save";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const rootDomain = "http://localhost:8000";

const Quiz = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // const courseId = useParams().id;
    const courseId = `62ca26bd2838cca760fed1ef`;
    const quizId = location.pathname.split("/")[4];

    const [quiz, setQuiz] = useState({});

    const getQuiz = async () => {
        const response = await axios({
            method: "GET",
            url: `${rootDomain}/api/course/${courseId}/quiz/${quizId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        setQuiz(response.data.data);
    };

    const deleteQuiz = async () => {
        await axios({
            method: "DELETE",
            url: `${rootDomain}/api/course/${courseId}/quiz/${quizId}`,
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate(`/courses/${courseId}/quiz`);
    };

    useEffect(() => {
        getQuiz();
    }, []);

    return (
        <>
            <Container fixed>
                <Box>
                    <Typography variant="h5">{quiz.title}</Typography>
                </Box>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<ArrowBackIosIcon />}
                        sx={{ mr: 2, mt: 3 }}
                        onClick={() => {
                            navigate(`/courses/${courseId}/quiz`);
                        }}
                    >
                        Back
                    </Button>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ mr: 2, mt: 3 }} onClick={deleteQuiz}>
                        Delete
                    </Button>
                </Box>

                <Box>
                    <Grid container spacing={2} style={{ backgroundColor: "#FFF", marginTop: "20px" }}>
                        {quiz.questions && quiz.questions.map((question) => <QuizQuestion question={question} />)}
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default Quiz;
