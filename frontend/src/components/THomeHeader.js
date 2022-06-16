import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import NotificationDialog from "../components/notificationDialog";

function THomeHeader(props) {
    const { onDrawerToggle } = props;
    const [chosenTab, setChosenTab] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const route_path = location.pathname.split("/")[2];
        if (route_path === undefined) {
            setChosenTab(0);
        } else if (route_path === "my-courses") {
            setChosenTab(1);
        } else if (route_path === "archived-courses") {
            setChosenTab(2);
        } else if (route_path === "recommended-courses") {
            setChosenTab(3);
        }
    }, []);

    const handleHomeTabClick = () => {
        setChosenTab(0);
        navigate("/");
    };

    const handleMyCoursesTabClick = () => {
        setChosenTab(1);
        navigate("/my-courses/");
    };

    const handleArchivedCoursesTabClick = () => {
        setChosenTab(2);
        navigate("/archived-courses/");
    };

    const handleRecommendedCoursesTabClick = () => {
        setChosenTab(3);
        navigate("/recommended-courses/");
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <NotificationDialog open={open} handleClose={handleClose} />
            <AppBar color="primary" position="sticky" elevation={0}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
                            <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle} edge="start">
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs>
                            <Typography color="inherit" variant="h6" component="h1">
                                Welcome, John Doe!
                            </Typography>
                        </Grid>
                        <Grid item xs />
                        <Grid item>
                            <Tooltip title="View Notifications">
                                <IconButton color="inherit" onClick={handleClickOpen}>
                                    <NotificationsIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                        <Grid item>
                            <IconButton color="inherit" sx={{ p: 0.5 }} onClick={() => navigate("/profile")}>
                                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <AppBar component="div" position="static" elevation={0} sx={{ zIndex: 0 }}>
                <Tabs value={chosenTab} textColor="inherit">
                    <Tab label="Home" onClick={handleHomeTabClick} />
                    <Tab label="My Courses" onClick={handleMyCoursesTabClick} />
                    <Tab label="Archived Courses" onClick={handleArchivedCoursesTabClick} />
                    <Tab label="Recommended Courses" onClick={handleRecommendedCoursesTabClick} />
                </Tabs>
            </AppBar>
        </>
    );
}

THomeHeader.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default THomeHeader;