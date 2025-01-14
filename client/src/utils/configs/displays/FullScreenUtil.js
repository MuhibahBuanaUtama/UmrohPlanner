import { useState, useEffect } from "react";

const FullScreenUtil = () => {
  const [fullScreen, setFullScreen] = useState(!!document.fullscreenElement);
  const [escapeEnabled, setEscapeEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (escapeEnabled && e.keyCode === 27) {
        handleChangeExitFullScreen();
      }
    };

    const handleFullScreenChange = () => {
      setFullScreen(!!document.fullscreenElement);
      setEscapeEnabled(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [escapeEnabled]);

  const handleChangeFullScreen = () => {
    if (!fullScreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement
          .requestFullscreen()
          .then(() => {
            setFullScreen(true);
          })
          .catch((error) => {
            console.error("Error entering fullscreen mode:", error);
          });
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setFullScreen(false);
          setEscapeEnabled(false);
        });
      }
    }
  };

  const handleChangeExitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen().then(() => {
        setFullScreen(false);
        setEscapeEnabled(false);
      });
    }
  };

  return { fullScreen, handleChangeFullScreen };
};

export default FullScreenUtil;
