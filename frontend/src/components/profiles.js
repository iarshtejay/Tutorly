import * as React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import ButtonBase from "@mui/material/ButtonBase";
import StarsIcon from '@mui/icons-material/Stars';

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function profiles({ Leaderboard }) {
  return <div id="profile" style={{ width: '100%' }}>{Item(Leaderboard)}</div>;
}

function Item(data) {
  return (
    <Paper
        sx={{
            p: 2
      }}>
    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', fontStyle: 'italic'}}><StarsIcon color="primary"/> TOP 5 PERFORMERS <StarsIcon color="primary"/></Typography>
      {data.map((value, index) => (
        <Paper
          sx={{
            p: 2,
            margin: "auto",
            maxWidth: "100%",
            flexGrow: 1,
            m: 2,
            bgcolor: "primary.main",
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="" src={value.img} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    {value.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {"Score - "} {value.score}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2" align="right">
                    {index === 0 && <Filter1Icon />}
                    {index === 1 && <Filter2Icon />}
                    {index === 2 && <Filter3Icon />}
                    {index === 3 && <Filter4Icon />}
                    {index === 4 && <Filter5Icon />}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Paper>
  );
}
