import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Container, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardActions, CardContent, Link, Rating, Box } from '@mui/material';

export default function Review() {


  return (
    <Container sx={{ maxWidth: 930, margin: 'auto', overflow: 'hidden' }}>
        <Typography variant="h5" component="h5" style={{color: "#009687", textAlign: "center", marginBottom: "1%"}}>
            Intermediate Python 101
        </Typography>
        <Typography variant="body2" gutterBottom style={{textAlign: "justify", marginBottom: "1%"}}> 
            This course is an excellent introduction to basic programming ideas as well as the Python programming language. 
            By the conclusion, you'll know how to write in Python and be able to transfer your knowledge from the Tutorly 
            platform to your own computer. Python is a sophisticated, adaptable, and general-purpose programming language 
            that can handle any task you throw at it.
        </Typography>
        <Divider variant='middle' />
        <Grid container columns={{ xs: 4, md: 12 }} style={{marginTop: "2%"}}>
            <Grid item xs={6} md={8} style={{paddingRight: "1%"}}>
                <Typography variant="overline" display="block" gutterBottom>
                    Module 1: Python Recap
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                    Overview
                </Typography>
                <Typography variant="body2" gutterBottom style={{textAlign: "justify", marginBottom: "1%"}}> 
                    Python relies on indentation, using whitespace, to define scope; such as the scope of loops, 
                    functions and classes. Other programming languages often use curly-brackets for this purpose.
                </Typography>
                <video autoplay controls style={{marginTop: "1%"}}>
                    <source src="https://www.youtube.com/watch?v=kqtD5dpn9C8" type="video/mp4" />
                </video>
            </Grid>
            <Grid item xs={6} md={4}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead style={{backgroundColor: "#009687", color: "white"}}>
                        <TableRow>
                            <TableCell style={{color: "white"}}>#</TableCell>
                            <TableCell style={{color: "white"}}>Course Material</TableCell>
                            <TableCell style={{color: "white"}}>Download</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">1</TableCell>
                                <TableCell>Assignment Python Introduction</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">2</TableCell>
                                <TableCell>Practice Code Examples</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">3</TableCell>
                                <TableCell>Exercide Python Interfaces</TableCell>
                                <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><CloudDownloadIcon /></Link></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        <Divider variant='middle' style={{marginTop: "1%"}}/>
        <Typography variant="h6" component="h6" style={{color: "#009687", marginBottom: "1%"}}>
            Ratings & Reviews
        </Typography>
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Rate Module</Typography>
                <StarIcon style={{color: "#F6BE00"}}/><StarIcon style={{color: "#F6BE00"}} /><StarBorderIcon /><StarBorderIcon /><StarBorderIcon />
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Review Module</Typography>
                <TextField id="outlined-basic" label="Write Review" variant="outlined" />
                <CardActions>
                    <Button variant="contained" endIcon={<SendIcon />}>Post</Button>
                </CardActions>
                <Divider variant='middle' style={{marginTop: "1%", marginBottom: "1%"}}/>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Anna Mandyne</Typography>
                <StarIcon style={{color: "#F6BE00"}}/><StarIcon style={{color: "#F6BE00"}} /><StarIcon style={{color: "#F6BE00"}}/><StarIcon style={{color: "#F6BE00"}} /><StarBorderIcon />
                <Typography variant="subtitle2" gutterBottom component="div">
                    "I know from first-hand experience that you can go in knowing zero, nothing, 
                    and just get a grasp on everything as you go and start building right away."
                </Typography>
                <Divider variant='middle' style={{marginTop: "1%", marginBottom: "1%"}}/>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>Matt Murwils</Typography>
                <StarIcon style={{color: "#F6BE00"}}/><StarIcon style={{color: "#F6BE00"}} /><StarIcon style={{color: "#F6BE00"}}/><StarBorderIcon/><StarBorderIcon />
                <Typography variant="subtitle2" gutterBottom component="div">
                    "This course says learn from scratch but what i found is that it automatically 
                    jumps in to coding without really explaining the definition of what you are doing. 
                    This course feels more suited for people whom already have experience in python."
                </Typography>
            </CardContent>
        </Card>
    </Container>
  );
}