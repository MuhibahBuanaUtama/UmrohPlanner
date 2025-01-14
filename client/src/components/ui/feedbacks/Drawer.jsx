const Drawer = ({ drawerRef, className, children }) => {
  return (
    <>
      <aside
        className={`top-0 z-20 min-h-screen w-[280px] p-2 dark:bg-zinc-950 md:sticky md:h-screen ${className}`}
        ref={drawerRef}
      >
        {children}
      </aside>
    </>
  );
};

export default Drawer;
