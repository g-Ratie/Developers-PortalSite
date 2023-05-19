import { GithubAuthProvider, getAuth, signInWithRedirect } from 'firebase/auth';
import { getFirebaseApp } from './config';

const firebaseApp = getFirebaseApp();

export const loginWithGitHub = async () => {
  const auth = getAuth(firebaseApp);
  const ghProvider = new GithubAuthProvider();
  ghProvider.addScope('read:user');

  await signInWithRedirect(auth, ghProvider).catch((error) => {
    console.log(error);
  });
};
