import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';

const LoginPage: NextPage = () => {
  return <button onClick={() => signIn('discord')}>Discordでログイン</button>;
};

export default LoginPage;
