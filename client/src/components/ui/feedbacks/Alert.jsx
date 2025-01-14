import { useState } from "react";
import Icon from "../commons/Icon";
import {
  FiInfo,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const Alert = ({ type, icon, title, closable, className, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCloseAlert = () => {
    setIsOpen(false);
  };

  return isOpen ? (
    <>
      <div
        className={`flex items-center gap-2 rounded-xl p-4 text-sm ${
          type === "info"
            ? "info"
            : type === "success"
              ? "success"
              : type === "warning"
                ? "warning"
                : type === "danger"
                  ? "danger"
                  : "basic"
        } ${title ? "font-regular" : "font-medium"} ${className}`}
      >
        {icon && (
          <Icon
            name={
              type === "info"
                ? FiInfo
                : type === "success"
                  ? FiCheckCircle
                  : type === "warning"
                    ? FiAlertTriangle
                    : type === "danger"
                      ? FiXCircle
                      : FiInfo
            }
            className={`${
              type === "info"
                ? "text-blue-500 dark:text-blue-50"
                : type === "success"
                  ? "text-green-500 dark:text-green-50"
                  : type === "warning"
                    ? "text-yellow-500 dark:text-yellow-50"
                    : type === "danger"
                      ? "text-red-500 dark:text-red-50"
                      : "text-blue-500 dark:text-blue-50"
            } ${title && "mt-[4.6px]"}`}
            size={20}
          />
        )}

        <div className="container">
          {title && (
            <div className="flex items-center justify-between">
              <p
                className={`${
                  type === "info"
                    ? "text-blue-500 dark:text-blue-50"
                    : type === "success"
                      ? "text-green-500 dark:text-green-50"
                      : type === "warning"
                        ? "text-yellow-500 dark:text-yellow-50"
                        : type === "danger"
                          ? "text-red-500 dark:text-red-50"
                          : "text-blue-500 dark:text-blue-50"
                } font-bold`}
              >
                {title}
              </p>

              {closable && (
                <button className="-mt-4 text-2xl" onClick={handleCloseAlert}>
                  &times;
                </button>
              )}
            </div>
          )}

          {children}
        </div>

        {!title && closable && (
          <button className="-mt-5 text-2xl" onClick={handleCloseAlert}>
            &times;
          </button>
        )}
      </div>
    </>
  ) : null;
};

export default Alert;
