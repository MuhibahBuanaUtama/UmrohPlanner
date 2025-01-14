import Icon from "../commons/Icon";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Select from "../forms/Select";

const   Pagination = ({
  isTotaled,
  isPerPage,
  current,
  total,
  totalPages,
  handlePageChange,
  handleSizeChange,
}) => {
  return (
    <>
      <div
        className={`mt-4 items-center md:flex ${isTotaled ? "justify-between" : "justify-end"}`}
      >
        {isTotaled && (
          <p>
            Total <span className="font-semibold">{total}</span> items
          </p>
        )}

        <div className="flex items-center justify-center gap-4 md:justify-end">
          <ul className="flex items-center justify-center gap-1">
            <li>
              <button
                className="rounded-md p-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-zinc-900"
                onClick={() => handlePageChange(current - 1)}
                disabled={current === 1}
              >
                <Icon name={FiChevronLeft} />
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === current}
                className={`rounded-md px-2 py-1 hover:bg-indigo-100 dark:hover:bg-zinc-900 ${
                  page === current
                    ? "bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-50"
                    : "text-gray-600 dark:text-gray-400"
                } `}
              >
                {page}
              </button>
            ))}

            <li>
              <button
                className="rounded-md p-1 hover:bg-gray-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-zinc-900"
                onClick={() => handlePageChange(current + 1)}
                disabled={current === totalPages}
              >
                <Icon name={FiChevronRight} />
              </button>
            </li>
          </ul>

          {isPerPage && (
            <Select
              name="itemsPerPage"
              className="mt-0"
              placeholder="10"
              onChange={handleSizeChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="50">50</option>
            </Select>
          )}
        </div>
      </div>
    </>
  );
};

export default Pagination;
