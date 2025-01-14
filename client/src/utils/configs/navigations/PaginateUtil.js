import { useState, useMemo, useEffect } from "react";

const PaginateUtil = ({ data = [] }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedData = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return data.slice(indexOfFirstItem, indexOfLastItem);
  }, [data, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalItems = data.length;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  return {
    paginatedData,
    itemsPerPage,
    setItemsPerPage,
    paginate,
    currentPage,
    totalItems,
    pageNumbers,
  };
};

export default PaginateUtil;
