import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";

import AppWrapper from "./Layout/AppWrapper"
import Loader from "./Context/Loader";
import MagicRings from "./Layout/MagicRings";
import { Toaster } from "react-hot-toast";

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 4000); // ✅ 7 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* ✅ FIRST LOAD SCREEN */}
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
            <Toaster position="top-center" reverseOrder={false} />
            <AppWrapper />
          </BrowserRouter>
        </>
      )}
    </div>
  );
}

export default App;