import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import ToggleButtonsMultipleDays from "./ToggleButtonsMultipleDays";
import { AccordionDetails } from "@mui/material";

export default function NewCourseDialogue({ currentCourses }) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
  const [classTime, setClassTime] = useState({}, ...days.map((x) => ({ [x.id]: '' })));
  const [classDays, setClassDays] = useState(() => [])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [details, setDetails] = useState({
    "id": "0F8JIqi4zwvb77FGz6Wp",
    "courseName": "",
    "tutorName": "Dr. Arshdeep Bree",
    "description": "",
    "cost": "",
    "rating": 0,
    "imageURL": "https://randomuser.me/api/portraits/men/81.jpg"
  })


  const [errorCourseName, setErrorCourseName] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);
  const [errorEndDate, setErrorEndDate] = useState(null);

  const [errorStructure, setErrorStructure] = useState(null);
  const [errorCoursePrice, setErrorCoursePrice] = useState(null);

  const handleChange = (event) => {
    setDetails({...details, event.target.name:event.target.value})
    if (prop === 'amount') {
      validateCoursePrice(event);
    } else if (prop === 'courseName') {
      validateCourseName(event);
    } else if (prop === 'structure') {
      validateStructure(event);
    } else if (prop === 'description') {
      validateDesc(event);
    } else if (prop === 'endDate') {
      validateCourseDates(event);
    }
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  const handleNext = () => {
    setOpen(false);
    setOpen2(true);
  };
  const handleBack = () => {
    setOpen(true);
    setOpen2(false);
  };
  const handleFinish = () => {
    setOpen(false);
    setOpen2(false);
    currentCourses.push({
      ...details
    })
  };

  const validateCourseName = (event) => {
    if (event.target.value.match("^[A-Za-z]*$") === null) {
      setErrorCourseName("Course name can only contain letters")
    } else {
      setErrorCourseName(null);
    }
  };

  const validateDesc = (event) => {
    if (event.target.value.length < 250) {
      setErrorDescription("Description should be of minimum 250 characters")
    } else {
      setErrorDescription(null);
    }
  }

  const validateCourseDates = (event) => {
    if (new Date(event.target.value()) < endDate) {
      setErrorEndDate("End date cannot be before start date")
    } else {
      setErrorEndDate(null);
    }
  }

  const validateStructure = (event) => {
    if (event.target.value.length < 250) {
      setErrorStructure("Structure should be of minimum 250 characters")
    } else {
      setErrorStructure(null);
    }
  }

  const validateCoursePrice = (event) => {
    if (event.target.value.match("^[0-9]*$") === null) {
      setErrorCoursePrice("Enter a valid price")
    } else {
      setErrorCoursePrice(null);
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Course
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please try to be as specific as possible about the details
          </DialogContentText>
          <Stack spacing={2}>
            <TextField id="outlined-basic" label="Name" variant="outlined" error={errorCourseName != null} helperText={errorCourseName} onChange={handleChange('courseName')} />
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              placeholder="Describe the course in your own words"
              error={errorDescription != null}
              helperText={errorDescription}
              onChange={handleChange}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  handleChange()
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextField id="outlined-basic" label="Maximum Capacity" variant="outlined" />
            <FormLabel id="demo-radio-buttons-group-label">Delivery Mode</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Online"
              name="radio-buttons-group"
            >
              <FormControlLabel value="In-person" control={<Radio />} label="In-person" />
              <FormControlLabel value="Online" control={<Radio />} label="Online" />
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleNext}>Next</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open2} onClose={handleClose}>
        <DialogTitle>New Course</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Button variant="contained" component="label">
              Upload Course Structure
              <input type="file" hidden />
            </Button>
            <p>Schedule Of Classes</p>
            <Stack direction='row' spacing={2} alignItems='stretch' justifyContent='center'>
              <ToggleButtonsMultipleDays classDays={classDays} setClassDays={setClassDays} />
              <Stack spacing={1}>
                {days.map(day => {
                  return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <TimePicker
                        label={day}
                        key={`class-time-${day}`}
                        value={classTime.day}
                        disabled={classDays.find(element => element === day) === undefined}
                        //disabled={true}
                        onChange={(newValue) => {
                          setClassTime({ ...classTime, day: newValue })
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>);
                })}
              </Stack>
            </Stack>

            <OutlinedInput
              id="outlined-adornment-amount"
              onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              placeholder={"Course Price"}
              error={errorCoursePrice != null}
              helperText={errorCoursePrice}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack}>Back</Button>
          <Button onClick={handleFinish}>Finish</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
