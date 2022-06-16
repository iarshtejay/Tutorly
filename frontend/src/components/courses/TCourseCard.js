import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { theme } from "../../theme/theme";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 5,
}));

export default function TCourseCard({
  courseId,
  courseName,
  tutorName,
  description,
  cost,
  rating,
  imageURL,
  showProgress
}) {

  const [favorite, setFavorite] = React.useState(false);

  const handleFavoriteClick = () => {
    console.log('fv', favorite);
    if(favorite){
      setFavorite(false);
    } else {
      setFavorite(true);
    }
    
  }
  return (
    <Card sx={{ maxWidth: 350 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {tutorName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={courseName}
        subheader={tutorName}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
        <Rating name="half-rating" defaultValue={rating} precision={0.5} readOnly />
        <br />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <br />

        {showProgress && <BorderLinearProgress theme={theme} variant="determinate" value={50} />}
      </CardContent>
      <CardActions disableSpacing>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon style={{ color: favorite?"#009688":"grey" }} onClick={handleFavoriteClick} />
            </IconButton>
          </Grid>
          <Grid item xs={2}>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Grid>
          <Grid item xs={8} style={{textAlign: 'right'}}>
            <Button>GO TO COURSE</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
