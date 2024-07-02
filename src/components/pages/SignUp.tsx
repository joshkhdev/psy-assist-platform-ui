import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
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
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import { HOME_REF } from '../../resources/Refs';
import { z as zodSchema } from "zod";

const defaultTheme = createTheme();

function SignUp() {

  const [showPassword, setShowPassword] = React.useState(false);
  const [firstNameIsEmpty, setFirstNameIsEmpty] = React.useState(false);
  const [lastNameIsEmpty, setLastNameIsEmpty] = React.useState(false);
  const [emailIsEmpty, setEmailIsEmpty] = React.useState(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = React.useState(false);
  const [emailVerify, setEmailVerify] = React.useState(true);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
    
  const validateEmail = (email: string | null): boolean => {
    try {
      zodSchema.string().email().parse(email);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    let error = false;

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
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
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
    setEmail('');
    setEmailIsEmpty(false);
    setEmailVerify(true);
  };

  const handleFocusFirstNameInput = () => {
    setFirstName('');
    setFirstNameIsEmpty(false);
  };

  const handleFocusLastNameInput = () => {
    setLastName('');
    setLastNameIsEmpty(false);
  };

  const handleFocusPasswordInput = () => {
    setPassword('');
    setPasswordIsEmpty(false);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            marginTop: 8
          }}>
          <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {SIGN_UP_HEADER}
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item sm={6} xs={12}>
            <TextField
              autoComplete='given-name'
              autoFocus
              error = {firstNameIsEmpty}
              fullWidth
              helperText= {firstNameIsEmpty ? EMPTY_FIELD_ERROR : ' '}
              id='firstName'
              label={FIRST_NAME_PLACEHOLDER}
              margin='normal'
              name='firstName'
              required
              onBlur={(e) => setFirstName(e.target.value)}
              onChange={(e) => setFirstName(e.target.value)}
              onFocus={handleFocusFirstNameInput}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              autoComplete='family-name'
              error = {lastNameIsEmpty}
              fullWidth
              helperText= {lastNameIsEmpty ? EMPTY_FIELD_ERROR : ' '}
              id='lastName'
              label={LAST_NAME_PLACEHOLDER}
              margin='normal'
              name='lastName'
              required
              onBlur={(e) => setLastName(e.target.value)}
              onChange={(e) => setLastName(e.target.value)}
              onFocus={handleFocusLastNameInput}
            />
            <TextField
              autoComplete='email'
              error = {emailIsEmpty || !emailVerify}
              fullWidth
              helperText= {emailIsEmpty ? EMPTY_FIELD_ERROR : (emailVerify ? ' ' : INCORRECT_EMAIL)}
              id='email'
              label={EMAIL_PLACEHOLDER}
              margin='normal'
              name='email'
              required
              onBlur={handleBlurEmailInput}
              onFocus={handleFocusEmailInput}
            />
            <FormControl fullWidth margin='normal' required sx={{ mt: 1 }} variant='outlined'>
            <InputLabel htmlFor='password'>{PASSWORD_PLACEHOLDER}</InputLabel>
            <OutlinedInput
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              error = {passwordIsEmpty}
              id='password'
              label={PASSWORD_PLACEHOLDER}
              name='password'
              type={showPassword ? 'text' : 'password'}
              onBlur={(e) => setPassword(e.target.value)}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handleFocusPasswordInput}
            />
            <FormHelperText error={passwordIsEmpty}>{passwordIsEmpty ? EMPTY_FIELD_ERROR : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Button
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type='submit'
            variant='contained'>
            {SIGN_UP_BUTTON}
          </Button>
          <Grid container justifyContent='flex-begin'>
            <Grid item>
              <Link href='#' variant='body2'>
                {SIGN_IN_REF}
              </Link>
            </Grid>
            <Link 
              className='link_field'
              href={HOME_REF}
              variant='body2'>
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