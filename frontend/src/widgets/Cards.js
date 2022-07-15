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
        width={512}
        height={256}
        image={picture}
        alt={name}
      />
      <CardContent>
        <Typography variant="h4" color="text.secondary">
          {caption || name}
        </Typography>
        <Typography mt={1} fontStyle={"italic"} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
