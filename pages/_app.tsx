import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <div>
      <Component {...pageProps} />
    </div>
  )
}

export default App;