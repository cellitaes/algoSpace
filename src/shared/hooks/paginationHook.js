import { useCallback, useEffect, useState } from 'react';

const usePagination = (itemsPerPage, data = []) => {
   const [currentPage, setCurrentPage] = useState(0);
   const [currentData, setCurrentData] = useState(data);
   const [filterOption, setFilterOption] = useState('all');
   const [maxPage, setMaxPage] = useState(0);

   const setNewMaxPage = useCallback(
      (data) => {
         setMaxPage(Math.ceil(data.length / itemsPerPage));
      },
      [itemsPerPage]
   );

   const setNewCurrentData = useCallback(
      (data) => {
         const begin = currentPage * itemsPerPage;
         const end = begin + itemsPerPage;
         setCurrentData(data.slice(begin, end));
      },
      [currentPage, itemsPerPage]
   );

   const filterData = useCallback(
      (filterOption) => {
         return data.filter((d) => {
            if (filterOption === 'all') return true;
            return d.category.categoryId.toLowerCase() === filterOption;
         });
      },
      [data]
   );

   useEffect(() => {
      const newData = filterData(filterOption);
      setNewCurrentData(newData);
      setNewMaxPage(newData);
   }, [filterData, filterOption, setNewCurrentData, setNewMaxPage]);

   const jump = (page) => {
      setCurrentPage(page);
   };

   const resetPage = useCallback(() => {
      setCurrentPage(0);
   }, []);

   const setNewDataSet = useCallback(
      (filterOption) => {
         const newData = filterData(filterOption);
         setFilterOption(filterOption);
         setNewCurrentData(newData);
         setNewMaxPage(newData);
      },
      [setNewMaxPage, setNewCurrentData, filterData]
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
