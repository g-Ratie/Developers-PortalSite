import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { FirebaseAuthProvider } from '../auth/Provider';

function App({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = () => {
    setColorScheme((scheme) => (scheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <FirebaseAuthProvider>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider>
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </FirebaseAuthProvider>
  );
}

export default App;
