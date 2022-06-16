import Profiles from "./profiles";
import { Leaderboard } from "./database";
import Grid from "@mui/material/Grid";
import React from "react";

export default function Board() {
  return (
    <>
      <Grid item container alignItems="center" justifyContent="center">
        <Profiles Leaderboard={sort(Leaderboard)}></Profiles>
      </Grid>
    </>
  );
}

function sort(data) {
  return data.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}
