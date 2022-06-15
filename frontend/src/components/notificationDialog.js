import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from '@mui/material/Switch';
import { Alert, Checkbox, Snackbar } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import AddNotification from './AddNotification';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function NotificationDialog(props) {

    const [updateNotification, setUpdateNotification] = React.useState(false);
    const [tabValue, setTabValue] = React.useState('1');
    const [sendNotify, setSendNotify] = React.useState(false);

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setUpdateNotification(false);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const [open, setOpen] = React.useState(false);

    const handleCreateNotification = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseSendNotifySnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSendNotify(false);
    };

    return (
        <div>
            <AddNotification open={open} handleClose={handleClose} setSendNotify={setSendNotify} />
            <Snackbar
                autoHideDuration={4000}
                open={sendNotify}
                onClose={handleCloseSendNotifySnackbar} >
                <Alert color='primary' variant='filled' severity="success">Notification sent successfully!</Alert>

            </Snackbar>
            <Dialog
                fullScreen
                open={props.open}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar color="primary" position="sticky" elevation={0}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Notifications
                        </Typography>
                        <Typography>Off</Typography>
                        <Switch
                            defaultChecked
                            color="default"
                            onChange={() => setUpdateNotification(true)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Snackbar
                            autoHideDuration={4000}
                            open={updateNotification}
                            onClose={handleCloseSnackbar} >
                            <Alert color='primary' variant='filled' severity="success">Notification preference updated successfully!</Alert>

                        </Snackbar>
                        <Typography>On</Typography>

                        <Grid item>
                            <Tooltip title="Create Notifications">
                                <IconButton color="inherit" onClick={handleCreateNotification}>
                                    <NotificationAddIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <TabContext value={tabValue}>
                    <AppBar
                        component="div"
                        position="static"
                        elevation={0}
                        sx={{ zIndex: 0 }}
                    >
                        <TabList onChange={handleTabChange} textColor="inherit">
                            <Tab label="All Notifications" value="1" />
                            <Tab label="Starred" value="2" />
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <List>
                            <ListItem button>
                                <ListItemText primary="Reminder" secondary="Last day to register for Maths course" />

                                <Checkbox
                                    checkedIcon={<StarIcon />}
                                    icon={<StarBorderIcon />}
                                />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText
                                    primary="Promotion"
                                    secondary="Maths Course at 50% off"
                                />
                                <Checkbox
                                    checkedIcon={<StarIcon />}
                                    icon={<StarBorderIcon />}
                                />
                            </ListItem>
                        </List>
                    </TabPanel>
                    <TabPanel value="2">
                        <List>
                            <ListItem button>
                                <ListItemText primary="Reminder" secondary="Last day to register for Maths course" />
                                <Checkbox
                                    defaultChecked
                                    checkedIcon={<StarIcon />}
                                    icon={<StarBorderIcon />}
                                />
                            </ListItem>
                            <Divider />
                        </List>
                    </TabPanel>
                </TabContext>
            </Dialog>
        </div>)
}

export default NotificationDialog;