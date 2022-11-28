import React, { useContext, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { NavLink, useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/httpHook';
import usePagination from '../../shared/hooks/paginationHook.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faAngleRight,
   faAngleLeft,
   faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import { URL } from '../../config';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { AuthContext } from '../../shared/context/AuthContext.js';

import './Category.css';

const Category = ({ categories }) => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const [tasks, setTasks] = useState([]);
   const [currentCategory, setCurrentCategory] = useState(null);

   const { currentData, currentPage, maxPage, jump, resetPage, setNewDataSet } =
      usePagination(5, tasks);

   const { category } = useParams();

   const { token } = useContext(AuthContext);

   useEffect(() => {
      const getTasksByParam = async () => {
         const url = `${URL}/tasks`;
         const method = 'GET';
         const body = null;
         const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         };

         const tasks = await sendRequest(url, method, body, headers);
         setTasks(tasks.data);
      };
      getTasksByParam();
   }, [sendRequest, setTasks, token]);

   useEffect(() => {
      resetPage();
   }, [resetPage, category]);

   useEffect(() => {
      const catTranslation = categories.find(
         (cat) => cat.categoryId.toLowerCase() === category.toLowerCase()
      )?.translation;
      setCurrentCategory(catTranslation);
   }, [category, categories, setCurrentCategory]);

   useEffect(() => {
      setNewDataSet(category);
   }, [setNewDataSet, tasks, category]);

   const handlePageClick = (event) => {
      jump(event.selected);
   };

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="align-items-left">
            <h1 className="category-name">{currentCategory}</h1>
            <hr />
            <h2 className="tasks-introduction">Zadania:</h2>
         </div>
         <div className="category-tasks">
            <ReactPaginate
               className="category-pagination"
               breakLabel="..."
               nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
               onPageChange={handlePageClick}
               pageRangeDisplayed={1}
               pageCount={maxPage}
               previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
               renderOnZeroPageCount={null}
               forcePage={currentPage}
            />
            {currentData?.map((task) => (
               <div key={task.id}>
                  <NavLink className="task" to={`/start/task/${task.id}`}>
                     <div
                        className={`task__difficulty task__difficulty--${task.difficulty.id.toLowerCase()}`}
                     >
                        {task.difficulty.translation}
                     </div>
                     <div className="task__name">{task.name}</div>
                     {task.done && (
                        <div className="task__done">
                           <FontAwesomeIcon icon={faCircleCheck} />
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
