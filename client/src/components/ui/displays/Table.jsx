import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../forms/Input";
import Pagination from "../navigations/Pagination";
import SortUtil from "@/utils/configs/displays/SortUtil";
import SearchUtil from "@/utils/configs/displays/SearchUtil";
import Button from "../commons/Button";
import { ActiveUtil } from "@/utils/configs/navigations/DropdownUtil";
import { FormatToRupiahUtil } from "@/utils/helpers/FormatToRupiahUtil";

const Table = ({
  columns,
  initialData,
  isSorted,
  isSearched,
  isPaginated,
  isTotaled,
  isPerPage,
  current,
  total,
  totalPages,
  handlePageChange,
  handleSizeChange,
  toButton,
}) => {
  const { sortedData, requestSort, getSortIcon } = SortUtil({
    initialData,
  });

  const [searchResult, setSearchResult] = useState(sortedData);
  const { searchTerm, handleSearchData } = SearchUtil({
    data: sortedData,
    setSearchResult: setSearchResult,
  });

  const tableRef = useRef();

  const navigate = useNavigate();
  const { active } = ActiveUtil();

  return (
    <>
      <div
        className={`justify-end gap-4 overflow-auto p-1 ${active === "setting" ? "hidden" : "md:flex"}`}
      >
        {isSearched && (
          <Input
            type="text"
            name="search"
            placeholder="🔍 Cari sesuatu..."
            className="float-end mb-4 mt-0 bg-gray-100 md:mb-0 md:w-1/4"
            value={searchTerm}
            onChange={handleSearchData}
          />
        )}
        <Button
          onClick={() => navigate(`${toButton}`)}
          size="sm"
          children="Tambah Data"
          className="sm:py-3"
        />
      </div>

      <table ref={tableRef} className="w-full">
        <thead>
          <tr
            className={`${isSorted && "cursor-pointer"} text-xs uppercase dark:text-white`}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={isSorted ? () => requestSort(col.key) : null}
                className="px-4 py-4"
              >
                <div className="flex items-center gap-1">
                  {col.label} {isSorted ? getSortIcon(col.key) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 text-gray-900 dark:divide-zinc-700 dark:text-white">
          {searchResult.map((item, index) => (
            <tr key={index} className="text-base dark:text-gray-400">
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.key === "from" || col.key === "to" ? (
                    item[col.key] && (
                      <span>
                        {new Date(item[col.key]).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </span>
                    )
                  ) : col.key === "roomPrices" ? (
                    item.roomPrices.map((room, index) => (
                      <div key={index}>
                        <p>
                          <span className="small">{room.roomType}:</span>
                          <br></br>{" "}
                          <span className="text-gray-900 dark:text-gray-200">
                            {room.price}
                          </span>
                        </p>
                      </div>
                    ))
                  ) : col.key === "distance" ? (
                    item[col.key] + "m"
                  ) : (col.key === "airlinePrice") |
                    (col.key === "usdToRupiah") |
                    (col.key === "localOffice") |
                    (col.key === "b2b") |
                    (col.key === "b2c") ? (
                    FormatToRupiahUtil(item[col.key])
                  ) : (col.key === "visaPrice") | (col.key === "laPrice") ? (
                    <span>${item[col.key]}</span>
                  ) : col.key === "actions" ? (
                    col.render(item)
                  ) : (
                    item[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {isPaginated && (
        <Pagination
          isTotaled={isTotaled}
          isPerPage={isPerPage}
          current={current}
          total={total}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          handleSizeChange={handleSizeChange}
        />
      )}
    </>
  );
};

export default Table;
