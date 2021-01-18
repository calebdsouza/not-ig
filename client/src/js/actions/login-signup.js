import isEmail from 'validator/lib/isEmail';
import { FireAuth } from '../actions/firebase';
import { APIS } from '../constants';

export const validateEmail = (email, setEmailError) => {
  if (!isEmail(email)) {
    setEmailError('Invalid Email');
    return;
  }
  setEmailError('');
};

export const validatePassword = (password, setPassError) => {
  if (password.length < 8) {
    setPassError('Invalid Password');
    return;
  }
  setPassError('');
};

export const validatePasswordConf = (password, passwordConf, setPassConfError) => {
  console.log(password, passwordConf, 'CECHLL');
  if (password !== passwordConf) {
    setPassConfError('Passwords Do Not Match');
    return;
  }
  setPassConfError('');
};

export const signupHandler = async (
  event,
  setError,
  setLoading,
  email,
  password,
  isValid,
  history,
  setType,
) => {
  if (!isValid) {
    return;
  }

  try {
    setError('');
    setLoading(true);
    await FireAuth.createUserWithEmailAndPassword(email, password);
    if (FireAuth.currentUser) {
      const resJson = await setupUserRequest();
      console.log('CHECK', resJson);
      await setType(resJson.type);
      history.push('/dashboard');
    }
    setLoading(false);
  } catch (e) {
    setError('Error creating account');
    if (FireAuth.currentUser) await FireAuth.currentUser.delete();
    setLoading(false);
  }
};

export const setupUserRequest = async () => {
  const user = FireAuth.currentUser;
  const token = user && (await user.getIdToken());
  const request = new Request(APIS.signup, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const response = await fetch(request);
  console.log('RES', response);
  return await response.json();
};

export const loginHandler = async (
  event,
  setError,
  setLoading,
  { emailRef, passwordRef },
  isValid,
  history,
) => {
  if (!isValid) {
    return;
  }

  try {
    setError('');
    setLoading(true);
    await FireAuth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
    history.push('/dashboard');
    setLoading(false);
  } catch (e) {
    setError('Invalid credentials, try again');
    setLoading(false);
  }
};

export const logoutHandler = async (event, logout, setError, setLoading, history) => {
  event.preventDefault();

  try {
    setError('');
    setLoading(true);
    await logout();
    history.push('/');
    setLoading(false);
  } catch (e) {
    console.log(e);
    setError('Error logging out');
    setLoading(false);
  }
};
