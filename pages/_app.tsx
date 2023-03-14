import '@/styles/globals.css'
import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'

import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const App = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <div className="xl:w-[1200px] h-[100vh] xl:border-x-2 xl:border-gray-200 m-auto overflow-hidden">
        <Navbar />

        <div className="flex gap-6 md:gap-20">
          <div className="h-[92vh] overflow-hidden xl:hover:overflow-auto">
            <Sidebar />
          </div>

          <div className="flex flex-col gap-10 overflow-auto h-[88vh] flex-1">
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App;