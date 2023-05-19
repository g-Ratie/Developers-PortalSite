import { Button } from '@mantine/core';
import { loginWithGitHub } from '../auth/loginWithGitHub';

function Loginbutton() {
  const handleLogin = async () => {
    await loginWithGitHub();
  };

  return (
    <Button radius="xl" size="md" onClick={handleLogin}>
      Login
    </Button>
  );
}
export default Loginbutton;
