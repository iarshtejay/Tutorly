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
import Container from "@mui/material/Container";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";

const quizzes = [
    {
        id: 1,
        name: "Quiz 1",
        startDate: "2020-01-01",
        dueDate: "2020-01-01",
        status: true,
        attemps: 2,
    },
    {
        id: 2,
        name: "Quiz 2",
        startDate: "2020-02-01",
        dueDate: "2020-02-04",
        status: true,
        attemps: 1,
    },
    {
        id: 3,
        name: "Quiz 3",
        startDate: "2020-03-01",
        dueDate: "2020-03-03",
        status: false,
        attemps: 3,
    },
    {
        id: 4,
        name: "Quiz 4",
        startDate: "2020-04-01",
        dueDate: "2020-04-03",
        status: false,
        attemps: 0,
    },
];

const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const QuizList = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <Container fixed>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                                Active Quizzes
                            </Typography>
                            <Demo>
                                <List>
                                    {quizzes.map((quiz) => (
                                        <ListItem
                                            key={quiz.id}
                                            secondaryAction={
                                                <IconButton
                                                    aria-label="Start"
                                                    onClick={(e) => {
                                                        const id = location.pathname.split("/")[2];
                                                        navigate(`/courses/${id}/quiz/${quiz.id}`);
                                                    }}
                                                >
                                                    <KeyboardArrowRightRoundedIcon />
                                                </IconButton>
                                            }
                                            disabled={!quiz.status}
                                        >
                                            <ListItemIcon>
                                                <FolderIcon />
                                            </ListItemIcon>
                                            <ListItemText primary={quiz.name} secondary={`Available On ${quiz.startDate} Until ${quiz.dueDate}`} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Demo>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default QuizList;
