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
import { Card, CardActions, CardContent, CardMedia, Grid, Rating, Stack } from "@mui/material";
import TTutorCard from "./TTutorCard";
const CourseBanner = ({ courseImage, tutor, courseRating, courseDescription, tutorDescription }) => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className="w-100" src={courseImage || "assets/img/gallery/ux-designer.png"} alt="..." />
                <Grid container spacing={1} style={{marginTop: 15}}>
                    <Grid item xs={4}>
                        <Rating name="half-rating" defaultValue={courseRating?.$numberDecimal} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={8} style={{textAlign: "right"}}>
                        <Button variant="contained" type="submit" onClick={handleClickOpen}>
                            APPLY
                        </Button>
                    </Grid>
                </Grid>
                <CourseDescription courseDescription={courseDescription} tutorDescription={tutorDescription}></CourseDescription>
            </Grid>
            <Grid item xs={4}>
                {tutor && <TTutorCard tutorId={tutor._id} courses={tutor.courses} tutorName={tutor.name} description={tutor.description} rating={tutor.rating} imageURL={tutor.imageURL} expertise={tutor.expertise}></TTutorCard>}
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
