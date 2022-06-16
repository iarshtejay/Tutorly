import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function ChildBlogs(props) {
    const { post } = props;

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Article Title
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse doloremque magnam error praesentium adipisci vel excepturi accusantium reiciendis expedita blanditiis voluptatibus ipsa recusandae iusto nemo, alias assumenda earum modi dicta non eveniet? Sequi culpa aspernatur deleniti magni, sed, ut omnis eveniet assumenda quis voluptas nisi voluptatem exercitationem asperiores, eaque consequuntur aliquam ad. Natus ipsam exercitationem provident magni a, iste odio quod aliquam necessitatibus error ut esse adipisci! Aspernatur ab atque possimus aliquid magnam hic dolores quisquam? Quam quibusdam suscipit quis amet sed natus quasi reprehenderit est nostrum optio nemo beatae enim quod quo consequatur doloremque recusandae similique, accusantium blanditiis ullam!
                    </Typography>
                </Box>
            </Modal>
            <Grid item xs={12} md={6}>
                <CardActionArea component="a" href="#" onClick={handleOpen}>
                    <Card sx={{ display: "flex" }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5" color="primary">
                                {post.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {post.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {post.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>
                        <CardMedia component="img" sx={{ width: 160, display: { xs: "none", sm: "block" } }} image={post.image} alt={post.imageLabel} />
                    </Card>
                </CardActionArea>
            </Grid>
        </>
    );
}

ChildBlogs.propTypes = {
    post: PropTypes.shape({
        date: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        imageLabel: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChildBlogs;
