import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthCtx';
import { loginHandler, validateEmail } from '../actions/login-signup';

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 15px;
  height: 80vh;
`;

const LoginTextField = styled(TextField)`
  margin: 10px !important;
  width: 250px !important;
`;

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setLoading } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const history = useHistory();

  const isEmailErr = () => {
    return emailError !== '';
  };
  const isValidForm = () => {
    return !isEmailErr;
  };

  const emailLabel = () => {
    return isEmailErr ? emailError : 'Email';
  };

  const isSubmitError = submitError !== '';

  return (
    <LoginWrapper>
      <h1> Store Owner Login </h1>
      {isSubmitError ? (
        <Alert severity="error">{submitError}</Alert>
      ) : (
        <>
          <br />
          <br />
          <br />
        </>
      )}
      <LoginTextField
        error={isEmailErr}
        required
        id="EmailSignup"
        type="email"
        inputRef={emailRef}
        label={emailLabel}
        variant="outlined"
        onBlur={(event) => {
          validateEmail(event.target.value, setEmailError);
        }}
      />
      <LoginTextField
        required
        id="PasswordSignup"
        inputRef={passwordRef}
        label={'Password'}
        type="password"
        variant="outlined"
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={(event) => {
          loginHandler(
            event,
            setSubmitError,
            setLoading,
            { emailRef, passwordRef },
            isValidForm,
            history,
          );
        }}
      >
        Sign Up
      </Button>
      <br />
      <Typography>
        Need an account?
        <Link to="/signup">Sign up</Link>
      </Typography>
    </LoginWrapper>
  );
}
