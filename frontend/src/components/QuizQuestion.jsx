import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

const QuizQuestion = ({ question }) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Question {question.id}</Typography>
                <Typography>{question.question}</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Your Answer</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                        <FormControlLabel checked={question.options[0].isCorrect} value={question.options[0].option} control={<Radio />} label={question.options[0].option} />
                        <FormControlLabel checked={question.options[1].isCorrect} value={question.options[1].option} control={<Radio />} label={question.options[1].option} />
                        <FormControlLabel checked={question.options[2].isCorrect} value={question.options[2].option} control={<Radio />} label={question.options[2].option} />
                        <FormControlLabel checked={question.options[3].isCorrect} value={question.options[3].option} control={<Radio />} label={question.options[3].option} />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Divider variant="middle" />
            </Grid>
            <Grid item xs={12}></Grid>
        </>
    );
};

export default QuizQuestion;
