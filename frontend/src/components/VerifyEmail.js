// Importing the required modules
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import background from "../images/image.svg";
import { theme } from "../theme/theme";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    // Defining form validation
    const validationSchema = yup.object({
        // First name is required
        code: yup
            .string("Enter Verification Code")
            .matches(/^[A-Za-z0-9 ]*$/, "Please enter valid code")
            .required("Verification Code is required"),
        // Email is required and should be in proper format
        email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
    });
    const formik = useFormik({
        initialValues: {
            code: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            fetch(`${process.env.BACKEND_BASE_URL}/user/verifyEmail`, {
                method: 'POST',
                headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                code: values.code,
                email:values.email
                })
            }).then(async (response) => {
                const body = await response.json();
                if (response.status === 200) {
                alert(body.message)
                navigate('/landing', { state: values })
                } else {
                alert(body.message)
                }
            })
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <Grid
                    // Importing image
                    item
                    xs={false}
                    sm={4}
                    md={6}
                    sx={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={6} component={Paper} elevation={20} square>
                    <Box
                        sx={{
                            marginTop: 5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }} // Importing Lock Icon
                    >
                        <Avatar className="mx-auto mt-3 lock_icon" sx={{ backgroundColor: "primary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography align="center" variant="h5">
                            Verify Email
                        </Typography>
                        <Paper elevation={20} style={{ padding: "30px 20px", maxWidth: 400, margin: "20px auto" }}>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }} borderRadius="50%">
                                <TextField // Input field for First Name
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="code"
                                    label="Verification Code"
                                    name="code"
                                    autoComplete="code"
                                    autoFocus
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    error={formik.touched.code && Boolean(formik.errors.code)}
                                    helperText={formik.touched.code && formik.errors.code}
                                />
                                <TextField // Input field for Email Address
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    autoComplete="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                <Button // SignUp Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Submit
                                </Button>
                                <Grid container>
                                    
                                </Grid>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
