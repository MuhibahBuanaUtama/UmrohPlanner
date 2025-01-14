import { useState, useEffect } from "react";

const DarkModeUtil = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const storedDark = localStorage.getItem("dark");
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemDarkModeChange = (e) => {
      const newDarkMode = e.matches;

      document.body.classList.toggle("dark", e.matches);
      localStorage.setItem("dark", JSON.stringify(newDarkMode));
    };

    if (storedDark !== null) {
      setDark(JSON.parse(storedDark));

      if (storedDark === "true") {
        document.body.classList.toggle("dark", prefersDarkMode.matches);
      }
    } else {
      setDark(prefersDarkMode.matches);

      document.body.classList.toggle("dark", prefersDarkMode.matches);
      localStorage.setItem("dark", JSON.stringify(prefersDarkMode.matches));
    }

    prefersDarkMode.addEventListener("change", handleSystemDarkModeChange);

    return () => {
      prefersDarkMode.removeEventListener("change", handleSystemDarkModeChange);
    };
  }, []);

  const handleChangeDarkMode = () => {
    const newDarkMode = !dark;

    setDark(newDarkMode);

    document.body.classList.toggle("dark", newDarkMode);
    localStorage.setItem("dark", JSON.stringify(newDarkMode));
  };

  return { dark, handleChangeDarkMode };
};

export default DarkModeUtil;
