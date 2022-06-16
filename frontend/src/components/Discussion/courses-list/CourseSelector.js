import SearchOffIcon from "@mui/icons-material/SearchOff";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setActiveTab } from "../../../store/slice/appSlice";
import TCard from "../../../widgets/Cards";
import { fetchCourseList } from "../services/discussion-rest";
import { searchCourses, setActiveCourse } from "../slice/DiscussionSlice";
import SearchBar from "./SearchBar";

const CourseSelector = () => {
  const { isFetching, list, filteredList } = useSelector(
    (state) => state.discussion.courses
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchKey, setSearchKey] = useState("");

  const isSearchPerformed = searchKey.length !== 0;

  useEffect(() => {
    dispatch(fetchCourseList());
  }, [dispatch]);

  const onSelectedHandler = (id) => {
    dispatch(setActiveCourse(id));
    dispatch(setActiveTab("Forum"));
    navigate("/discussion/forum", { state: { id } });
  };

  const onChangeHandler = (key) => {
    setSearchKey(key);
  };

  useEffect(() => {
    if (isSearchPerformed) {
      dispatch(searchCourses(searchKey));
    }
  }, [searchKey, isSearchPerformed, dispatch]);

  const resultantList = isSearchPerformed ? filteredList : list;

  return (
    <>
      <Box component={"main"} width={"100%"} height={"90%"}>
        <Box
          sx={{
            pt: 1,
            pb: 1,
          }}
        >
          <Container maxWidth="md">
            <SearchBar onChange={onChangeHandler} />
          </Container>
        </Box>
        <Box sx={{ py: 1, px: 4 }} height={"80%"}>
          {isFetching ? (
            <Box
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography variant="h5" color="text.secondary" paragraph>
                Courses ({resultantList.length})
              </Typography>
              {resultantList.length === 0 ? (
                <Box
                  display={"flex"}
                  width="100%"
                  height="80%"
                  flexDirection={"column"}
                  justifyContent="center"
                  alignItems={"center"}
                >
                  <SearchOffIcon sx={{ fontSize: "5rem", mb: "1rem" }} />
                  <Typography variant="h5"> No Result Found </Typography>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  {resultantList.map((data) => (
                    <Grid
                      key={data.id}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      xl={2}
                    >
                      <TCard data={data} onSelect={onSelectedHandler} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default CourseSelector;