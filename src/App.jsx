import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import AppWrapper from "./Layout/AppWrapper"
import Loader from "./Context/Loader";
import MagicRings from "./Layout/MagicRings";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/utils/ScrollToTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


function App() {

const queryClient = new QueryClient();
  const [isTelegram, setIsTelegram] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  // const ALLOW_BROWSER = false;
  const ALLOW_BROWSER = true;

useEffect(() => {
  const tg = window.Telegram?.WebApp;

  if (!ALLOW_BROWSER) {
    if (!tg || !tg.initData || tg.initData.length === 0) {
      setIsTelegram(false);
    }
  }

  const timer = setTimeout(() => {
    setInitialLoading(false);
  }, 4000);

  return () => clearTimeout(timer);
}, []);

  



  if (!isTelegram && !ALLOW_BROWSER)  {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-center px-5">
      <div>
        <h1 className="text-2xl font-bold mb-3">Open in Telegram</h1>
        <p className="text-gray-400">
          This app only works inside Telegram. Please open it from Telegram bot.
        </p>

        {/* Optional Button */}
        <a
          href="https://t.me/cipera_bot/direct"
          className="mt-4 inline-block bg-blue-600 px-5 py-2 rounded-lg"
        >
          Open Telegram
        </a>
      </div>
    </div>
  );
}

 return (
  <QueryClientProvider client={queryClient}>
    <div className="relative min-h-screen text-white overflow-hidden">

      {initialLoading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black z-[99999]">
          <Loader />
        </div>
      ) : (
        <>
          {/* BACKGROUND */}
          <div className="fixed inset-0 bg-black/90 -z-[5]">
            <MagicRings
              color="#fc42ff"
              colorTwo="#42fcff"
              ringCount={6}
              speed={0.8}
              opacity={0.8}
              followMouse={true}
              clickBurst={true}
            />
          </div>

          <div className="fixed inset-0 bg-black/90 -z-10"></div>

          {/* ROUTER */}
          <BrowserRouter>
            <ScrollToTop />
            <Toaster position="top-center" reverseOrder={false} />
            <AppWrapper />
          </BrowserRouter>
        </>
      )}
    </div>
  </QueryClientProvider>
);
}

export default App;