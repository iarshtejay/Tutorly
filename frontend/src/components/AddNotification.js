import React from 'react'
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function AddNotification(props) {

    const sendNotification = () => {
        props.setSendNotify(true);
        props.handleClose();
    };

    return (<div>
        <Dialog
            open={props.open}
            onClose={props.handleClose}

        >
            <DialogTitle>Create Notification</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">Select Type</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="reminder"
                    >
                        <FormControlLabel value="reminder" control={<Radio />} label="Reminder" />
                        <FormControlLabel value="promotions" control={<Radio />} label="Promotions" />
                    </RadioGroup>
                </FormControl>
                <TextField
                    autoFocus
                    margin="dense"
                    id="message"
                    label="Message"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={sendNotification}>Send</Button>
            </DialogActions>
        </Dialog>
    </div>
    )
}
