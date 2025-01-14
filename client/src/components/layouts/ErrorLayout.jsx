import DarkModeUtil from "@/utils/configs/displays/DarkModeUtil";

const ErrorLayout = ({ children }) => {
  const { dark, handleChangeDarkMode } = DarkModeUtil();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center text-center dark:bg-zinc-950">
        {children}
      </div>
    </>
  );
};

export default ErrorLayout;
