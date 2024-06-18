import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/material/FormHelperText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { z } from "zod";
import { HOME_REF } from '../../resources/Refs';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import {
    SIGN_UP_HEADER,
    SIGN_UP_BUTTON,
    SIGN_IN_REF,
    FIRST_NAME_PLACEHOLDER,
    LAST_NAME_PLACEHOLDER,
    EMAIL_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    INCORRECT_EMAIL,
    EMPTY_FIELD_ERROR
} from '../../resources/SignUpResources';

const defaultTheme = createTheme();

function SignUp() {

    const [showPassword, setShowPassword] = React.useState(false);
    const [firstNameIsEmpty, setFirstNameIsEmpty] = React.useState(false);
    const [lastNameIsEmpty, setLastNameIsEmpty] = React.useState(false);
    const [emailIsEmpty, setEmailIsEmpty] = React.useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = React.useState(false);
    const [emailVerify, setEmailVerify] = React.useState(true);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const validateEmail = (email: string | null): boolean => {
        try {
          z.string().email().parse(email);
          return true;
        } catch {
          return false;
        }
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        var error = false;

        if (!email) {
            setEmailIsEmpty(true);
            setEmailVerify(true);
            error = true;
        }

        if (!firstName) {
            setFirstNameIsEmpty(true);
            error = true;
        }

        if (!lastName) {
            setLastNameIsEmpty(true);
            error = true;
        }

        if (!password) {
            setPasswordIsEmpty(true);
            error = true;
        }

        if (!emailVerify)
            error = true;

        if (error) return;

        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };
    

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleBlurEmailInput = (e: { target: { value: any; }; }) => {
        const inputEmail = e.target.value;
        
        if(!inputEmail) {
             setEmailIsEmpty(false);
             setEmailVerify(true);
        }

        if(inputEmail && !validateEmail(inputEmail)) {
            setEmailVerify(false);
        } else {
            setEmailVerify(true);
        }
    
        if(inputEmail) {
            setEmail(inputEmail);
        }
    };

    const handleFocusEmailInput = () => {
        setEmail("");
        setEmailIsEmpty(false);
        setEmailVerify(true);
    };

    const handleFocusFirstNameInput = () => {
        setFirstName("");
        setFirstNameIsEmpty(false);
    };

    const handleFocusLastNameInput = () => {
        setLastName("");
        setLastNameIsEmpty(false);
    };

    const handleFocusPasswordInput = () => {
        setPassword("");
        setPasswordIsEmpty(false);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

      return (
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {SIGN_UP_HEADER}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      error = {firstNameIsEmpty}
                      label={FIRST_NAME_PLACEHOLDER}
                      helperText= {firstNameIsEmpty ? EMPTY_FIELD_ERROR : " "}
                      autoFocus
                      onFocus={handleFocusFirstNameInput}
                      onChange={(e) => setFirstName(e.target.value)}
                      onBlur={(e) => setFirstName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastName"
                      error = {lastNameIsEmpty}
                      label={LAST_NAME_PLACEHOLDER}
                      helperText= {lastNameIsEmpty ? EMPTY_FIELD_ERROR : " "}
                      name="lastName"
                      autoComplete="family-name"
                      onFocus={handleFocusLastNameInput}
                      onChange={(e) => setLastName(e.target.value)}
                      onBlur={(e) => setLastName(e.target.value)}
                    />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    name="email"
                    autoComplete="email"
                    error = {emailIsEmpty || !emailVerify}
                    label={EMAIL_PLACEHOLDER}
                    helperText= {emailIsEmpty ? EMPTY_FIELD_ERROR : (emailVerify ? " " : INCORRECT_EMAIL)}
                    onBlur={handleBlurEmailInput}
                    onFocus={handleFocusEmailInput}
                />
                <FormControl sx={{ mt: 1 }} variant="outlined" margin="normal" fullWidth required>
                <InputLabel htmlFor="password">{PASSWORD_PLACEHOLDER}</InputLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label={PASSWORD_PLACEHOLDER}
                    error = {passwordIsEmpty}
                    onFocus={handleFocusPasswordInput}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => setPassword(e.target.value)}
                />
                <FormHelperText error={passwordIsEmpty}>{passwordIsEmpty ? EMPTY_FIELD_ERROR : " "}</FormHelperText>
                </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {SIGN_UP_BUTTON}
                </Button>
                <Grid container justifyContent="flex-begin">
                  <Grid item>
                    <Link href="#" variant="body2">
                      {SIGN_IN_REF}
                    </Link>
                  </Grid>
                  <Link 
                        className='link_field'
                        variant='body2'
                        href={HOME_REF}>
                        {BACK_TO_HOME_BUTTON_HEADER}
                    </Link>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      );
}

export default SignUp;