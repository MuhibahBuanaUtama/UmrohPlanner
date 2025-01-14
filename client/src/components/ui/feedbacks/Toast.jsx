import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiSpinner } from "react-icons/pi";

const Toast = () => {
  return <ToastContainer position="top-center" transition={Zoom} draggable />;
};

export const ToastCombine = ({ title, message }) => (
  <div>
    <strong className="text-gray-600 dark:text-gray-400">{title}</strong>
    <div className="text-gray-600 dark:text-gray-400">{message}</div>
  </div>
);

export const notifyBasic = (
  message,
  autoClose,
  closeButton,
  onCloseCallback,
) => {
  toast(<ToastCombine message={message} />, {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
    hideProgressBar: true,
    autoClose: autoClose,
    closeButton: closeButton,
    onClose: onCloseCallback,
  });
};

export const notifySuccess = (message, onCloseCallBack) => {
  toast.success(<ToastCombine title="Success" message={message} />, {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
    onClose: onCloseCallBack,
  });
};

export const notifyWarning = (message) => {
  toast.warn(<ToastCombine title="Warning" message={message} />, {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
  });
};

export const notifyError = (message) => {
  toast.error(<ToastCombine title="Error" message={message} />, {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
  });
};

export const notifyInfo = (message) => {
  toast.info(<ToastCombine title="Info" message={message} />, {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
    autoClose: false,
    hideProgressBar: false,
  });
};

export const notifyLoading = (options = {}) => {
  const id = toast.info("Loading...", {
    className: "dark:bg-zinc-900",
    style: { borderRadius: "12px" },
    isLoading: true,
    autoClose: true,
    closeButton: false,
    // draggable: false,
    icon: <PiSpinner className="animate-spin" size={20} />,
    ...options,
  });

  return id;
};

export const closeNotifyLoading = (id) => {
  toast.dismiss(id);
};

export default Toast;
