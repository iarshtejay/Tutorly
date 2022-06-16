import * as React from 'react';
import Typography from '@mui/material/Typography';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Container, Divider, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardActions, CardContent, Link, Rating } from '@mui/material';


export default function Upload() {

  const [text, setText] = React.useState('')


  return (
    <Container sx={{ maxWidth: 930, margin: 'auto', overflow: 'hidden' }}>
        <Typography variant="h5" component="h5" style={{color: "#009687", textAlign: "center", marginBottom: "1%"}}>
            Upload Content - Intermediate Python 101
        </Typography>
        <Divider variant='middle' style={{marginBottom: "2%"}} />
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{backgroundColor: "#009687", color: "white"}}>
                  <TableRow>
                    <TableCell style={{color: "white", textAlign: "center"}}>Content Description</TableCell>
                    <TableCell style={{color: "white", textAlign: "center"}}>Upload Media Content</TableCell>
                    <TableCell style={{color: "white", textAlign: "center"}}>Upload Supporting Documents</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell style={{textAlign: "center"}}>
                      <CKEditor editor = {ClassicEditor} data={text} onChange={(event, editor) => {
                        const data = editor.getData() 
                        setText(data)
                      }} />
                    </TableCell>
                    <TableCell style={{textAlign: "center"}}>
                        <Button style={{borderColor: "#06283D", color: "#06283D"}} variant="outlined" endIcon={<VideoFileIcon />}>Upload Video</Button>
                      </TableCell>
                      <TableCell style={{textAlign: "center"}}>
                        <Button style={{borderColor: "#06283D", color: "#06283D"}} variant="outlined" endIcon={<UploadFileIcon />}>Upload Document</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
            </TableContainer>
            <div className='d-grid d-md-flex justify-content-md-end'>
                <Button variant="contained" endIcon={<SendIcon />} style={{marginTop: "2%"}}>Post</Button>
            </div> 
            </div>
          </div>
        </div>
                        
  
        <Divider variant='middle' style={{marginTop: "2%"}} />
        <Typography variant="h6" component="h6" style={{color: "#009687", textAlign: "center", marginBottom: "1%"}}>
            Content Uploaded
        </Typography>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-12'>
              <TableContainer component={Paper}>
                      <Table>
                          <TableHead style={{backgroundColor: "#009687", color: "white"}}>
                          <TableRow>
                              <TableCell style={{color: "white", textAlign: "center"}}>#</TableCell>
                              <TableCell style={{color: "white", textAlign: "center"}}>Course Material</TableCell>
                              <TableCell style={{color: "white", textAlign: "center"}}>Upload date</TableCell>
                              <TableCell style={{color: "white", textAlign: "center"}}>Content Type</TableCell>
                              <TableCell style={{color: "white", textAlign: "center"}}>Delete</TableCell>
                          </TableRow>
                          </TableHead>
                          <TableBody>
                              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row" style={{textAlign: "center"}}>1</TableCell>
                                  <TableCell style={{textAlign: "center"}}>Assignment Python Introduction</TableCell>
                                  <TableCell style={{textAlign: "center"}}>03-09-2022</TableCell>
                                  <TableCell style={{textAlign: "center"}}>PDF File</TableCell>
                                  <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><DeleteIcon /></Link></TableCell>
                              </TableRow>
                              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row" style={{textAlign: "center"}}>2</TableCell>
                                  <TableCell style={{textAlign: "center"}}>Practice Code Examples</TableCell>
                                  <TableCell style={{textAlign: "center"}}>12-10-2021</TableCell>
                                  <TableCell style={{textAlign: "center"}}>MP4 File</TableCell>
                                  <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><DeleteIcon /></Link></TableCell>
                              </TableRow>
                              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                  <TableCell component="th" scope="row" style={{textAlign: "center"}}>3</TableCell>
                                  <TableCell style={{textAlign: "center"}}>Exercide Python Interfaces</TableCell>
                                  <TableCell style={{textAlign: "center"}}>05-15-2022</TableCell>
                                  <TableCell style={{textAlign: "center"}}>Text File</TableCell>
                                  <TableCell style={{textAlign: "center"}}> <Link href="#" underline="none"><DeleteIcon /></Link></TableCell>
                              </TableRow>
                          </TableBody>
                      </Table>
                </TableContainer>
            </div>
          </div>
        </div>
    </Container>
  );
}