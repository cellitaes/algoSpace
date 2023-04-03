import { useCallback, useEffect, useState } from "react";

const usePagination = <T,>(itemsPerPage: number, data: T[]) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentData, setCurrentData] = useState(data);
  const [maxPage, setMaxPage] = useState(1);

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  const setNewMaxPage = useCallback(
    (data: T[]) => {
      setMaxPage(Math.ceil(data.length / itemsPerPage));
    },
    [itemsPerPage]
  );

  const setNewCurrentData = useCallback(
    (data: T[]) => {
      const begin = currentPage * itemsPerPage;
      const end = begin + itemsPerPage;
      setCurrentData(data.slice(begin, end));
    },
    [currentPage, itemsPerPage]
  );

  const jump = (page: number) => {
    setCurrentPage(page);
  };

  const resetPage = useCallback(() => {
    setCurrentPage(0);
  }, []);

  const setNewDataSet = useCallback(
    (data: T[]) => {
      setNewCurrentData(data);
      setNewMaxPage(data);
    },
    [setNewMaxPage, setNewCurrentData]
  );

  return {
    jump,
    resetPage,
    setNewDataSet,
    currentData,
    currentPage,
    maxPage,
  };
};

export default usePagination;
