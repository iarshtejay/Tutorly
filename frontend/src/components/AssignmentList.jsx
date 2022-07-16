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
import { useState } from "react";

const assignments = [
    {
        id: 1,
        name: "Assignment 1",
        attachment: "Assignment1_S22.pdf",
        score: "80/100",
        dueDate: "May 27, 2022 11:59 PM",
        description: "This is the first assignment. Download the file for more information.",
        attachmentSize: "1.5 MB",
    },
    {
        id: 2,
        name: "Assignment 2",
        attachment: "Assignment2_S22.pdf",
        score: "92/100",
        dueDate: "June 27, 2022 11:59 PM",
        description: "This is the second assignment. Download the file for more information.",
        attachmentSize: "1.9 MB",
    },
    {
        id: 3,
        name: "Assignment 3",
        attachment: "Assignment3_S22.pdf",
        score: "86/100",
        dueDate: "August 27, 2022 11:59 PM",
        description: "This is the third assignment. Download the file for more information.",
        attachmentSize: "2.5 MB",
    },
];

function Row({ row }) {
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
                    {row.name}
                </TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.dueDate}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="body1" gutterBottom component="div">
                                {row.description}
                            </Typography>
                            <Typography variant="h6" gutterBottom component="div">
                                Attachments
                            </Typography>
                            <Typography variant="body1" gutterBottom component="div"></Typography>
                            <Typography variant="body1" gutterBottom component="div">
                                <a href="#">{row.attachment}</a> {row.attachmentSize}
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
    return (
        <>
            <Container fixed>
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
                                                <b>Score</b>
                                            </TableCell>
                                            <TableCell align="right">
                                                <b>Due Date</b>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assignments.map((row) => (
                                            <Row key={row.id} row={row} />
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
