import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthCtx';
import {
  signupHandler,
  validateEmail,
  validatePassword,
  validatePasswordConf,
} from '../actions/login-signup';

const SignupWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px;
  height: 80vh;
`;

const SignupTextField = styled(TextField)`
  margin: 10px !important;
  width: 250px !important;
`;

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const { setError, setLoading, setUserType } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [passConfError, setPassConfError] = useState('');
  const history = useHistory();

  const isEmailErr = emailError !== '';
  const isPassErr = passError !== '';
  const isPassConfError = passConfError !== '';

  const isValidForm = !isEmailErr && !isPassErr && !isPassConfError;

  const emailLabel = () => {
    return isEmailErr ? emailError : 'Email';
  };
  const passLabel = () => {
    return isPassErr ? passError : 'Password';
  };
  const passConfLabel = () => {
    return isPassConfError ? passConfError : 'Password Confirmation';
  };

  return (
    <SignupWrapper>
      <h1> Sign Up</h1>
      <SignupTextField
        error={isEmailErr}
        required
        id="EmailSignup"
        inputRef={emailRef}
        type="email"
        label={emailLabel}
        variant="outlined"
        onBlur={(event) => {
          validateEmail(event.target.value, setEmailError);
        }}
      />
      <SignupTextField
        error={isPassErr}
        required
        id="PasswordSignup"
        inputRef={passwordRef}
        type="password"
        label={passLabel}
        variant="outlined"
        helperText="At least 8 characters long"
        onBlur={(event) => {
          validatePassword(event.target.value, setPassError);
        }}
      />
      <SignupTextField
        error={isPassConfError}
        required
        id="PasswordConfSignup"
        type="password"
        inputRef={passwordConfRef}
        label={passConfLabel}
        variant="outlined"
        onBlur={(event) => {
          validatePasswordConf(passwordRef.current.value, event.target.value, setPassConfError);
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={(event) => {
          signupHandler(
            event,
            setError,
            setLoading,
            emailRef.current?.value,
            passwordRef.current?.value,
            isValidForm,
            history,
            setUserType,
          );
        }}
      >
        Sign Up
      </Button>
      <br />
      <Typography>
        Already have an account?
        <Link to="/login">Login</Link>
      </Typography>
    </SignupWrapper>
  );
}
