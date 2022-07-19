/*
    Author: Parth Shah
*/

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";

function Row({ row }) {
    const navigate = useNavigate();
    const courseId = useParams().id;

    const [open, setOpen] = useState(false);

    return (
        <>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell align="right">{moment(row.startDate).format("llll")}</TableCell>
                <TableCell align="right">{moment(row.endDate).format("llll")}</TableCell>
                <TableCell align="right">
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/courses/${courseId}/assignments/${row._id}/submissions`);
                        }}
                    >
                        View Submissions
                    </a>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" gutterBottom component="div">
                                {row.description}
                            </Typography>
                            {row.attachments.length > 0 && (
                                <Typography variant="h6" gutterBottom component="div">
                                    Attachments
                                </Typography>
                            )}
                            <Typography variant="body1" gutterBottom component="div"></Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                {row.attachmentUrls.map((url) => (
                                    <a href={url} key={url}>
                                        Attachment.pdf
                                        <br />
                                    </a>
                                ))}
                            </Typography>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

const AssignmentList = () => {
    const navigate = useNavigate();

    const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;
    const courseId = useParams().id;

    const [assignments, setAssignments] = useState([]);

    const getAssignments = async () => {
        const response = await axios({
            method: "GET",
            url: `${rootDomain}/course/${courseId}/assignment/list`,
        });
        setAssignments(response.data.data);
    };

    useEffect(() => {
        getAssignments();
    }, []);

    return (
        <>
            <Container fixed>
                <Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={(e) => {
                            navigate(`/courses/${courseId}/assignments/new`);
                        }}
                    >
                        New Assignment
                    </Button>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h5" component="div">
                                Assignments
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>
                                                <b>Assignment</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Start Date</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Due Date</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Actions</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignments.map((row) => (
                                            <Row key={row._id} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    );
};

export default AssignmentList;
