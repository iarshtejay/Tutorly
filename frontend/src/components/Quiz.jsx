import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import QuizQuestion from "./QuizQuestion";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Quiz 1</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{ backgroundColor: "#FFF", marginTop: "20px" }}>
                    <QuizQuestion id="1" />
                    <QuizQuestion id="2" />
                    <QuizQuestion id="3" />
                    <QuizQuestion id="4" />
                    <QuizQuestion id="5" />
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={(e) => {
                                navigate(`/course/quiz`);
                            }}
                        >
                            Submit
                        </Button>
                    </Grid>
                    <Grid item xs={12}></Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Quiz;
