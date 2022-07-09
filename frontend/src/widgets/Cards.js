import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function TCard({ data, onSelect }) {
  const { name, picture, description, caption, id } = data;

  return (
    <Card
      onClick={() => onSelect(id)}
      sx={{
        height: "100%",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <CardMedia
        component="img"
        width={200}
        height={200}
        image={picture}
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          {caption || name}
        </Typography>
        <Typography fontStyle={"italic"} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
