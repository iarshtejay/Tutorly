import { default as ExpandMore, default as ExpandMoreIcon } from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Checkbox, Collapse, IconButton, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostDetails } from "../services/discussion-rest";

const DiscussionForumDetails = () => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const dispatch = useDispatch();

    const { isFetching, details, responses } = useSelector((state) => state.discussion.postDetails);

    useEffect(() => {
        dispatch(fetchPostDetails());
    }, [dispatch]);

    return (
        <>
            <Box width={"100%"} height={"90%"}>
                {Object.keys(details).length === 0 ? (
                    <></>
                ) : (
                    <>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {details.name[0]}
                                    </Avatar>
                                }
                                title={details.name}
                                subheader={details.timestamp.toDateString()}
                            />
                            <CardContent>
                                <Typography sx={{ textTransform: "capitalize" }} variant="h6" color="text.secondary">
                                    {details.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {details.message}
                                </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                                <IconButton aria-label="add to favorites">
                                    <FavoriteIcon />
                                </IconButton>
                                <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <Typography paragraph>{details.description}</Typography>
                                </CardContent>
                            </Collapse>
                        </Card>

                        <Box>
                            <Typography mt={2} variant="h6">
                                Responses
                            </Typography>
                        </Box>

                        <Box display={"flex"} alignItems="flex-end" flexDirection={"column"}>
                            {responses.map((d) => (
                                <Box display={"flex"}>
                                    <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                        <Box component={"span"} height={"fit-content"}>
                                            <Checkbox sx={{ "& .MuiSvgIcon-root": { fontSize: 50 }, mr: 4 }} />
                                        </Box>
                                    </Box>

                                    <Card sx={{ maxWidth: 1000, my: 3 }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                    {details.name[0]}
                                                </Avatar>
                                            }
                                            title={d.name}
                                            subheader={d.timestamp.toDateString()}
                                        />
                                        <CardContent>
                                            <Typography sx={{ textTransform: "capitalize" }} variant="h6" color="text.secondary">
                                                {d.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {d.message}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Box>
                            ))}
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default DiscussionForumDetails;
