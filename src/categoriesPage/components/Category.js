import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink, useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/httpHook';

import { URL } from '../../config';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './Category.css';

const Category = () => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const [tasks, setTasks] = useState([]);
   const [itemsPerPage, setItemsPerPage] = useState(5);
   const [currentItems, setCurrentItems] = useState([]);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);
   const [currentPage, setCurrentPage] = useState(0);

   const { category } = useParams();

   useEffect(() => {
      const getTasksByParam = async () => {
         const url = `${URL}/tasks`;
         const tasks = await sendRequest(url);
         setTasks(tasks);
      };
      getTasksByParam();
   }, []);

   useEffect(() => {
      setItemOffset(0);
      setCurrentPage(0);
   }, [category]);

   useEffect(() => {
      const filtratedTasks = tasks.filter((task) => {
         if (category === 'all') return true;
         return task.category.categoryId.toLowerCase() === category;
      });

      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(filtratedTasks.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(filtratedTasks.length / itemsPerPage));
   }, [tasks, itemOffset, itemsPerPage, category]);

   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % tasks.length;
      setItemOffset(newOffset);
      setCurrentPage(newOffset / itemsPerPage);
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="align-items-left">
            <p className="paragraph--normal-font paragraph--gray-out">
               Kategoria:
            </p>
            <h1 className="category-name">{category}</h1>
            <hr />
            <h2 className="tasks-introduction">Zadania:</h2>
         </div>
         <div className="category-tasks">
            <ReactPaginate
               className="category-pagination"
               breakLabel="..."
               nextLabel={<i class="fa-solid fa-angle-right"></i>}
               onPageChange={handlePageClick}
               pageRangeDisplayed={1}
               pageCount={pageCount}
               previousLabel={<i class="fa-solid fa-angle-left"></i>}
               renderOnZeroPageCount={null}
               forcePage={currentPage}
            />
            {currentItems?.map((task) => (
               <div key={task.id}>
                  <NavLink className="task" to={`/task/${task.id}`}>
                     <div
                        className={`task__difficulty task__difficulty--${task.difficulty.id.toLowerCase()}`}
                     >
                        {task.difficulty.translation}
                     </div>
                     <div className="task__name">{task.name}</div>
                     {task.done && (
                        <div className="task__done">
                           <i class="fa-solid fa-circle-check"></i>
                        </div>
                     )}
                  </NavLink>
               </div>
            ))}
         </div>
      </>
   );
};

export default Category;
