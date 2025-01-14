import Button from "../commons/Button";

const Dialog = ({
  dialogOpen,
  handleCloseDialog,
  disableBackdropClick,
  size,
  closable,
  scroll,
  footer,
  onClick,
  childrenTitle,
  children,
}) => {
  if (!dialogOpen) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseDialog();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950 bg-opacity-75"
        onClick={disableBackdropClick ? undefined : handleClickOutside}
      >
        <div
          className={`w-full transform overflow-hidden rounded-xl bg-white px-5 pb-6 pt-4 shadow-sm transition-all dark:bg-zinc-900 ${size === "md" ? "max-w-2xl" : size === "lg" ? "max-w-4xl" : "max-w-lg"}`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3>{childrenTitle}</h3>

            {closable && (
              <button
                className="text-2xl text-gray-900 hover:opacity-75 dark:text-gray-200"
                onClick={handleCloseDialog}
              >
                &times;
              </button>
            )}
          </div>

          <div
            className={`${scroll && "md:max-h-auto max-h-screen overflow-auto p-[2px]"}`}
          >
            {children}
          </div>

          {footer && (
            <div className="float-end mt-6 flex gap-2">
              {closable && (
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={handleClickOutside}
                >
                  Cancel
                </Button>
              )}

              <Button size="md" onClick={onClick}>
                Oke
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dialog;
