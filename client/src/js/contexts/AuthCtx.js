import React, { useContext, useState, useEffect } from 'react';
import { CircularProgress, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { FireAuth } from '../actions/firebase';

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const AuthCtx = React.createContext();

export function useAuth() {
  return useContext(AuthCtx);
}

export default function AuthProvider(props) {
  const [activeUser, setActiveUser] = useState();
  const [userType, setUserType] = useState('');
  const [userStores, setUserStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const logout = function () {
    return FireAuth.signOut();
  };

  useEffect(() => {
    const unsubscribe = FireAuth.onAuthStateChanged(async (user) => {
      await setActiveUser(user);
      if (user) {
        
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [] /* tell react to run this effect once (on mount and unmount) */);

  const value = {
    setLoading,
    setError,
    setSuccess,
    setUserType,
    setUserStores,
    activeUser,
    userType,
    userStores,
    logout,
  };

  return (
    <AuthCtx.Provider value={value}>
      {loading ? (
        <LoaderWrapper>
          <CircularProgress />
        </LoaderWrapper>
      ) : (
        props.children
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={error !== ''}
        onClose={() => {
          setError('');
        }}
        key={'mainerrortoast'}
      >
        <Alert variant="filled" elevation={12} severity="error">
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={success !== ''}
        onClose={() => {
          setSuccess('');
        }}
        key={'mainsuccesstoast'}
      >
        <Alert variant="filled" elevation={12} severity="success">
          {error}
        </Alert>
      </Snackbar>
    </AuthCtx.Provider>
  );
}
