import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Blog from "../../../components/Blog";

const item = {
    py: "2px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
        bgcolor: "rgba(255, 255, 255, 0.08)",
    },
};

const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;

    const navigate = useNavigate();

    const [categories, updateCategories] = useState([
        {
            id: "Interactions",
            children: [
                {
                    id: "Chat",
                    icon: <PeopleIcon />,
                    route: "/chat",
                },
                {
                    id: "Discussion Forum",
                    icon: <PeopleIcon />,
                    route: "/discussion",
                },
                {
                    id: "Blogs",
                    icon: <PeopleIcon />,
                    route: "/blogs",
                },
            ],
        },
        {
            id: "Courses",
            children: [{ id: "Manage", icon: <SettingsIcon /> }],
        },
    ]);

    const setActiveRoute = (category, child) => {
        updateCategories((oldState) => {
            const copy = [...oldState];
            copy.forEach((itr) => {
                [...itr.children].forEach((childItr) => {
                    if (itr.id === category && childItr.id === child) {
                        childItr.active = true;
                    } else {
                        childItr.active = false;
                    }
                });
            });

            return copy;
        });
    };

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}>Tutorly</ListItem>
                <ListItem
                    onClick={() => {
                        navigate("/");
                    }}
                    sx={{ ...item, ...itemCategory }}
                >
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: "#101F33" }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                        </ListItem>
                        {children.map(({ id: childId, icon, active, route, tabs }) => (
                            <ListItem disablePadding key={childId}>
                                <ListItemButton
                                    onClick={() => {
                                        setActiveRoute(id, childId);
                                        navigate(route, { state: { tabs } });
                                    }}
                                    selected={active}
                                    sx={item}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText>{childId}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}

                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
