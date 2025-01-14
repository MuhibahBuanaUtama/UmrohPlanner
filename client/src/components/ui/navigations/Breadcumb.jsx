import { Link } from "react-router-dom";
import Tag from "../displays/Tag";
import TitlePageUtil from "@/utils/configs/displays/TitlePageUtil";

const Breadcumb = ({ links }) => {
  const { title } = TitlePageUtil();

  return (
    <>
      <div className="hidden items-center justify-start gap-2 py-4 md:flex">
        <h5 className="font-medium">{title}</h5>
        <span className="text-gray-950 dark:text-gray-400">|</span>

        <Tag
          type="success"
          className="rounded-lg"
          children={
            <>
              {links.map((link, index) => (
                <span key={index} className="small">
                  <Link to={link.path} className="hover:underline">
                    {link.name}
                  </Link>
                  {index < links.length - 1 && (
                    <span className="ms-1">{">"}</span>
                  )}
                </span>
              ))}
            </>
          }
        />
      </div>
    </>
  );
};

export default Breadcumb;
