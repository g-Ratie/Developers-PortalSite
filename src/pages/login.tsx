// pages/login.js

import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { loginWithGitHub } from '../auth/loginWithGitHub';

const Login = () => {
  const handleLogin = async () => {
    await loginWithGitHub();
  };
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <div>{user ? <p>{user.displayName}</p> : <button onClick={handleLogin}>ログイン</button>}</div>
  );
};

export default Login;
