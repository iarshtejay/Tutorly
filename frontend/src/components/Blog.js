import ChildBlogs from './ChildBlogs'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { theme } from "../theme/theme";
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const featuredPosts = [
    {
        title: 'Java Management',
        date: 'June 12',
        description:
            'Last June we announced a new cloud service running on Oracle Cloud Infrastructure (OCI) to help',
        image: 'https://source.unsplash.com/random?sig=1',
        imageLabel: 'Image Text',
    },
    {
        title: 'Discrete Mathematics',
        date: 'June 11',
        description:
            'US K-12 mathematics has long been dominated by the notion that any legitimate pathway through high',
        image: 'https://source.unsplash.com/random?sig=2',
        imageLabel: 'Image Text',
    },
    {
        title: 'React JS',
        date: 'June 11',
        description:
            'If you have been around the React game long enough, you will remember the React.createClass',
        image: 'https://source.unsplash.com/random?sig=3',
        imageLabel: 'Image Text',
    },
    {
        title: 'Node JS',
        date: 'June 11',
        description:
            'Running subprocesses with Node.js is relatively simple. Node.js has a built-in module with a mature and stable API',
        image: 'https://source.unsplash.com/random?sig=4',
        imageLabel: 'Image Text',
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    height: 700,
    p: 2,
};




export default function Blog() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="#009688"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                    fontWeight="bold"
                >
                    BLOGS
                </Typography>
                <IconButton>
                    <SearchIcon />
                </IconButton>
                <Button variant="contained" size='small' sx={{ mt: 3, mb: 2, backgroundColor: '#009688', ":hover": { backgroundColor: '#009688' } }} onClick={handleOpen}>
                    Add Blogs
                </Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Grid container>
                            <Container maxWidth="xs"  >
                                <Typography align='center' variant="h6" fontWeight="bold" marginTop="20px" color="#009688">
                                    Add Blog
                                </Typography>
                                <Box component="form" noValidate sx={{ mt: 1 }} borderRadius="50%" >
                                    <TextField    // Input field for First Name
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                        autoFocus
                                    />
                                    <TextField    // Input field for First Name
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoComplete="description"
                                        autoFocus
                                        multiline
                                        rows={5}
                                        type="file"
                                    />
                                    <TextField
                                        id="date"
                                        margin="normal"
                                        label="Date "
                                        type="date"
                                        fullWidth
                                        multiline={false}
                                        defaultValue="2017-05-24"
                                        InputLabelProps={{
                                            color: "secondary",
                                            className: "DatePicker",
                                            style: { color: "#009688" },
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            style: { color: "#009688" },
                                        }}
                                    />
                                    <input
                                        style={{ display: "none" }}
                                        id="contained-button-file"
                                        type="file"
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" color="primary" component="span" fullWidth>
                                            UPLOAD IMAGE
                                        </Button>
                                    </label>

                                </Box>
                            </Container>
                        </Grid>
                        <Button   // SignUp Button
                            type="submit"
                            fullWidth
                            backgroundColor='#009688'
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#009688', ":hover": { backgroundColor: '#009688' } }}
                        >
                            SAVE
                        </Button>
                    </Box>

                </Modal>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            ></Toolbar>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Grid >
                    <Container maxWidth="lg">

                        <main>
                            <Grid container spacing={4}>
                                {featuredPosts.map((post) => (
                                    <ChildBlogs key={post.title} post={post} />
                                ))}
                            </Grid>

                        </main>
                    </Container>
                </Grid>
            </ThemeProvider>
        </React.Fragment>
    );
}