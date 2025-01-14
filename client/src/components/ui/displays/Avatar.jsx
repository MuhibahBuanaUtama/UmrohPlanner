import DefaultAvatar from "@/assets/img/default-avatar.jpg";
import Icon from "../commons/Icon";

const Avatar = ({ shape, size, type, text, icon, image }) => {
  return (
    <>
      <div
        className={`${
          shape === "rounded"
            ? "rounded-xl"
            : shape === "square"
              ? "rounded-none"
              : "rounded-full"
        } ${
          size === "sm"
            ? "size-8"
            : size === "md"
              ? "size-10"
              : size === "lg"
                ? "size-12"
                : "size-10"
        } flex size-10 items-center justify-center bg-gray-50 dark:bg-zinc-900`}
      >
        {type === "text" ? (
          <div className="small font-semibold">{text}</div>
        ) : type === "icon" ? (
          <Icon name={icon} className="text-gray-900 dark:text-gray-200" />
        ) : (
          <img
            src={image ? image : DefaultAvatar}
            className={`${
              shape === "rounded"
                ? "rounded-xl"
                : shape === "square"
                  ? "rounded-none"
                  : "size-8 rounded-full"
            }`}
            alt="avatar"
          />
        )}
      </div>
    </>
  );
};

export default Avatar;
