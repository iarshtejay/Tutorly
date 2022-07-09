import React from "react";
import CourseDescription from "./CourseDescription";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import { Card, CardActions, CardContent, CardMedia, Grid, Stack } from "@mui/material";
const CourseBanner = ({ image }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    console.log("image", image);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const categories = ["Technology", "Computer Science", "Machine Learning", "Computers"];
    const levels = ["Intermediate", "Beginner", "Advanced", "Super Advanced"];
    return (
        <Grid container>
            <Grid item xs={8}>
                <img class="w-100" src={image || "assets/img/gallery/ux-designer.png"} alt="..." />
                <CourseDescription></CourseDescription>
            </Grid>
            <Grid item xs={4}>
                <Card>
                    <CardMedia component="img" height="194" image={image} alt="Paella dish" />
                    <CardContent>
                        <Stack style={{ padding: 2 }}>
                            <div>
                                <strong>Name </strong>: John Wick
                            </div>
                            <div>
                                <strong>Enrolled </strong>: {Math.round(Math.random() * 500)} students
                            </div>
                            <div>
                                <strong>Duration </strong>: {Math.round(Math.random() * 70)} hours
                            </div>
                            <div>
                                <strong>Lectures </strong>: {Math.round(Math.random() * 20)} Sessions
                            </div>
                            <div>
                                <strong>Categories </strong>: {categories[Math.floor(Math.random() * categories.length)]}
                            </div>
                            <div>
                                <strong>Level </strong>: {levels[Math.floor(Math.random() * levels.length)]} Level
                            </div>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Stack>
                            <div>
                                <Button type="submit" onClick={handleClickOpen}>
                                    APPLY
                                </Button>
                            </div>
                        </Stack>
                    </CardActions>
                </Card>
            </Grid>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Please hit apply to continue..."}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to apply for the course?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} type="submit">
                        CANCEL
                    </Button>
                    <Button type="submit" onClick={handleClose} autoFocus>
                        APPLY
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};
export default CourseBanner;
