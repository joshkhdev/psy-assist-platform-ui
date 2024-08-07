import * as React from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
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
    FORGOT_PASSWORD_REF,
    SIGN_UP_REF_TEXT,
    SIGN_IN_HEADER,
    SIGN_IN_BUTTON,
    EMAIL_PLACEHOLDER,
    PASSWORD_PLACEHOLDER,
    REMEMBER_ME_HEADER,
    INCORRECT_EMAIL,
    EMPTY_FIELD_ERROR
} from '../../resources/SignInUpResources';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { BACK_TO_HOME_BUTTON_HEADER } from '../../resources/CommonResources';
import { HOME_REF, SIGN_UP_REF } from '../../resources/Refs';
import {
    handleBlurInput,
    validateEmail,
    validateInput,
    handleFocusInput
} from '../common/Validation';
import { SHA256 } from 'crypto-js';

const defaultTheme = createTheme();

function SignIn() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [emailIsEmpty, setEmailIsEmpty] = React.useState(false);
    const [passwordIsEmpty, setPasswordIsEmpty] = React.useState(false);
    const [emailVerify, setEmailVerify] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rememberMe, setRememberMe] = React.useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        let allChecked = true;

        allChecked = validateInput(allChecked, email, setEmailIsEmpty, setEmailVerify, validateEmail);
        allChecked = validateInput(allChecked, password, setPasswordIsEmpty);

        if (!allChecked) return;

        console.log({
            email: email,
            password: SHA256(password).toString(),
            rememberMe: rememberMe
        });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                }}
                >
                <Avatar sx={{ bgcolor: 'secondary.main', m: 1 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>
                    {SIGN_IN_HEADER}
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        autoComplete='email'
                        autoFocus
                        error = {emailIsEmpty || !emailVerify}
                        fullWidth
                        id='email'
                        helperText= {emailIsEmpty ? EMPTY_FIELD_ERROR : (emailVerify ? ' ' : INCORRECT_EMAIL)}
                        label={EMAIL_PLACEHOLDER}
                        margin='normal'
                        name='email'
                        required
                        onBlur={(e) => handleBlurInput(e.target.value, setEmail, setEmailIsEmpty, setEmailVerify, validateEmail)}
                        onFocus={() => handleFocusInput(setEmail, setEmailIsEmpty, setEmailVerify)}
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
                                    edge='end'
                                    >
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
                            onFocus={() => handleFocusInput(setPassword, setPasswordIsEmpty)}
                        />
                        <FormHelperText error={passwordIsEmpty}>{passwordIsEmpty ? EMPTY_FIELD_ERROR : ' '}</FormHelperText>
                        </FormControl>
                        
                        <FormControlLabel
                            control={<Checkbox
                                color='primary'
                                value='remember' 
                                onChange={(e) => setRememberMe(e.target.checked)} />
                            }
                            label={REMEMBER_ME_HEADER}
                        />
                        <Button
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            type='submit'
                            variant='contained'
                            >
                            {SIGN_IN_BUTTON}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href='#' variant='body2'>
                                    {FORGOT_PASSWORD_REF}
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link 
                                    href={SIGN_UP_REF} 
                                    variant='body2'>
                                    {SIGN_UP_REF_TEXT}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Link 
                    className='link_field'
                    href={HOME_REF}
                    variant='body2'>
                    {BACK_TO_HOME_BUTTON_HEADER}
                </Link>
            </Container>
        </ThemeProvider>
    );
}

export default SignIn;