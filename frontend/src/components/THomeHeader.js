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
import React from 'react';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

function THomeHeader(props) {
  const { onDrawerToggle } = props;
  const location = useLocation();
  const parentPath = location.pathname.split('/')[1]
  const [tab, setTab] = React.useState(parentPath);
  
  const navigate = useNavigate();

  
  console.log(location.pathname);

  const handleChange = (event, newValue) => {
    setTab(newValue);
    navigate(`/${newValue}`);
  };

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Typography color="inherit" variant="h6" component="h1">
                Authentication
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={tab} textColor="inherit" onChange={handleChange}>
          <Tab label="Home" value={'home'}/>
          <Tab label="My Courses" value={'courses'}/>
          <Tab label="Archived Courses" value={'archived'}/>
          <Tab label="Recommended Courses" value={'recommended'}/>
        </Tabs>
      </AppBar>
    </>
  );
}

THomeHeader.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default THomeHeader;