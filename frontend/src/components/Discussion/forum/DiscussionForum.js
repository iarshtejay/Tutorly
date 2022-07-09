import AddIcon from "@mui/icons-material/Add";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Box, Button, CircularProgress, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchForumPost } from "../services/discussion-rest";
import ForumPost from "./ForumPost";
import SearchBar from "./SearchBar";

const DiscussionForum = () => {
    const [searchKey, setSearchKey] = useState("");
    const isSearchPerformed = searchKey.length !== 0;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, filteredList, list } = useSelector((state) => state.discussion.posts);

    useEffect(() => {
        dispatch(fetchForumPost());
    }, [dispatch]);

    const onChangeHandler = (key) => {
        setSearchKey(key);
    };

    const resultantList = isSearchPerformed ? filteredList : list;

    useEffect(() => {}, [searchKey, isSearchPerformed, dispatch]);

    const onSelectHandler = (id) => {
        navigate("/discussion/forum/" + id);
    };

    const createPostHandler = () => {
      dispatch(navigate("/discussion/forum/editor"))
    }

    return (
        <>
            <Box width={"100%"} height={"90%"}>
                <Box
                    sx={{
                        pt: 1,
                        pb: 1,
                    }}
                >
                    <Container maxWidth="md">
                        <Box display={"flex"} alignItems={"center"}>
                            <SearchBar onChange={onChangeHandler} />
                            <Box minWidth={200} ml={5}>
                                <Button variant="outlined"  onClick={createPostHandler} startIcon={<AddIcon/>}>
                                    Create Post
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
                <Box sx={{ py: 1, px: 4 }} height={"80%"}>
                    {isFetching ? (
                        <Box height={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h5" color="text.secondary" paragraph>
                                Posts ({resultantList.length})
                            </Typography>
                            {resultantList.length === 0 ? (
                                <Box display={"flex"} width="100%" height="80%" flexDirection={"column"} justifyContent="center" alignItems={"center"}>
                                    <SearchOffIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
                                    <Typography variant="h5"> No Result Found </Typography>
                                </Box>
                            ) : (
                                <Grid mt={1} container spacing={2}>
                                    <ForumPost list={resultantList} onSelect={onSelectHandler}></ForumPost>
                                </Grid>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default DiscussionForum;
