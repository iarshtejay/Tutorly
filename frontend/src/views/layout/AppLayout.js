import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { Outlet, useLocation } from "react-router";
import { theme } from "../../theme/theme";
import Header from "./components/Header";
import Navigator from "./components/Navigator";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

const drawerWidth = 256;

export default function AppLayout() {
  const location = useLocation();
  const tabsConfig = {
    "chat": {
      tabs: [
        {
          label: "Messages",
          route: "chat/messages",
        },
        {
          label: "Users",
          route: "chat/user",
        },
      ],
    },
    "discussion": {
      tabs: [
        {
          label: "Courses",
          route: "discussion/courses",
        },
        {
          label: "Forum",
          route: "discussion/forum",
        },
      ],
    }
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}

        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: "block", xs: "none" } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          onDrawerToggle={handleDrawerToggle}
          tabs={tabsConfig[location.pathname.split("/")[1]]?.tabs }
        />
        <Box
          component="main"
          sx={{ flex: 1, py: 2, px: 2, bgcolor: "#eaeff1"}}
        >
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}
