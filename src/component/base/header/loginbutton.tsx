import { Button } from '@mantine/core';
import { signIn } from 'next-auth/react';

function LoginButton() {
  return (
    <Button radius="xl" size="md" onClick={() => signIn('discord')}>
      ログイン
    </Button>
  );
}

export default LoginButton;
