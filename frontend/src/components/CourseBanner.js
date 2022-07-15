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
import { Grid, Rating } from "@mui/material";
import TTutorCard from "./TTutorCard";
import { useDispatch, useSelector } from "react-redux";
import httpClient from "../lib/httpClient";
import Alert from "@mui/material/Alert";
import { useState, useEffect } from "react";
import { getEnrolledCourses } from "../views/pages/services/courses-rest.js";
import { EditCourseDialog } from "./EditCourseDialog";



const CourseBanner = ({ courseImage, tutor, courseRating, courseDescription, tutorDescription, initialEnrollStatus, courseId }) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
    const isTutor = localStorage.getItem("user")?.includes("tutor");
    const user=JSON.parse(localStorage.getItem("user"))
    
    const [isEnrolled, setIsEnrolled] = useState(initialEnrollStatus);
    const [action, setAction ] = useState(initialEnrollStatus === true ? "unenroll" : "enroll");
    const [enrollmentStatus, setEnrollmentStatus] = useState("initiated");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const handleFinish = () => {
        setOpen(false);
        setEnrollmentStatus("initiated")
        setAction((state)=>state==="enroll"?"unenroll":"enroll")
    };

    const handleEnrollment = async () => {

        const id = user?.student?._id || "62ca2f7a4f3727bc5d9a3e98";     
        const res = await httpClient.post(`/student/course/${action}/${courseId}`, {
            student:{
                id: id
            }
        })
        if (res.data.success) {
            setEnrollmentStatus("success")
        } else{
            setEnrollmentStatus("fail")
        }
        setIsEnrolled((state)=>(!state))
    };

    useEffect(() => {
        dispatch(getEnrolledCourses({ isTutor: isTutor, studentId: user?.tutor?._id || user?.student?._id || "62ca2f7a4f3727bc5d9a3e98" }));
    }, [dispatch, action]);


    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <img className="w-100" src={courseImage || "assets/img/gallery/ux-designer.png"} alt="..." />
                <Grid container spacing={1} style={{ marginTop: 15 }}>
                    <Grid item xs={4}>
                        <Rating name="half-rating" defaultValue={courseRating?.$numberDecimal} precision={0.5} readOnly />
                    </Grid>
                    <Grid item xs={8} style={{ textAlign: "right" }}>
                        {!isTutor && <Button variant="contained" type="submit" onClick={handleClickOpen}>{action.charAt(0).toUpperCase() + action.slice(1)}</Button>}
                    </Grid>
                </Grid>
                <CourseDescription courseDescription={courseDescription} tutorDescription={tutorDescription}></CourseDescription>
            </Grid>
            <Grid item xs={4}>
                {tutor && <TTutorCard tutorId={tutor._id} courses={tutor.courses} tutorName={tutor.name} description={tutor.description} rating={tutor.rating} imageURL={tutor.imageURL} expertise={tutor.expertise}></TTutorCard>}
            </Grid>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClickClose} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Are you sure you want to proceed?"}</DialogTitle>
                <DialogContent>
                    {enrollmentStatus==="initiated" && <DialogContentText>{`Do you want to proceed with ${action}ment?`}</DialogContentText>}
                    {enrollmentStatus === "fail" && <Alert severity="error">{`There was a problem processing your request`}</Alert>}
                    {enrollmentStatus === "success" && <Alert severity="success">{`Your request was successful`}</Alert>}
                </DialogContent>
                {enrollmentStatus === "initiated" ? (<DialogActions><Button onClick={handleClickClose} type="submit">Cancel</Button><Button type="submit" onClick={handleEnrollment} autoFocus>Confirm</Button></DialogActions>) : (<DialogActions><Button type="submit" onClick={handleFinish} autoFocus>Close</Button></DialogActions>)}
            </Dialog>
        </Grid>
    );
};
export default CourseBanner;
