import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";

const QuizQuestion = ({ id }) => {
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h6">Question {id}</Typography>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, eligendi voluptas deleniti recusandae, necessitatibus ad a reprehenderit doloribus numquam aut consequuntur laboriosam odit? Consequuntur possimus sed aut dicta laudantium rerum officia
                    corrupti ipsa eos. Beatae quisquam consectetur adipisci excepturi cumque. Lorem ipsum dolor sit amet consectetur adipisicing elit. In sint error, tenetur repellendus dolorem unde molestiae iusto similique esse officia.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Your Answer</FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group">
                        <FormControlLabel value="opt1" control={<Radio />} label="Corporis, eligendi voluptas" />
                        <FormControlLabel value="opt2" control={<Radio />} label="Beatae quisquam" />
                        <FormControlLabel value="opt3" control={<Radio />} label="Lorem ipsum dolor sit amet" />
                        <FormControlLabel value="opt4" control={<Radio />} label="Consequuntur possimus sed aut dicta laudantium" />
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
