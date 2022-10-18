import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useParams } from 'react-router-dom';
import Button from '../../shared/components/FormElements/Button';

import './Category.css';

const tasks = [
   {
      id: 1,
      name: 'Testowy task1',
      category: 'jakas categoria',
      difficulty: 'łatwy',
      class: 'easy',
   },
   {
      id: 2,
      name: 'Testowy task2',
      category: 'jakas categoria',
      difficulty: 'średni',
      class: 'medium',
   },
   {
      id: 3,
      name: 'Testowy task3',
      category: 'jakas categoria',
      difficulty: 'łatwy',
      class: 'easy',
   },
   {
      id: 4,
      name: 'Testowy task4',
      category: 'jakas categoria',
      difficulty: 'łatwy',
      class: 'easy',
   },
   {
      id: 5,
      name: 'Testowy task5',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 65,
      name: 'Testowy task6',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 75,
      name: 'Testowy task7',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 85,
      name: 'Testowy task8',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 95,
      name: 'Testowy task1',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 15,
      name: 'Testowy task2',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
   {
      id: 25,
      name: 'Testowy task3',
      category: 'jakas categoria',
      difficulty: 'ciężki',
      class: 'hard',
   },
];

const Category = () => {
   const { category } = useParams();
   const [itemsPerPage, setItemsPerPage] = useState(10);
   const [currentItems, setCurrentItems] = useState(null);
   const [pageCount, setPageCount] = useState(0);
   const [itemOffset, setItemOffset] = useState(0);

   useEffect(() => {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(tasks.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(tasks.length / itemsPerPage));
   }, [itemOffset, itemsPerPage]);

   const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % tasks.length;
      setItemOffset(newOffset);
   };

   return (
      <>
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
            />
            {currentItems?.map((task) => (
               <div key={task.id}>
                  <div className="task">
                     <div
                        className={`task__difficulty task__difficulty--${task.class}`}
                     >
                        {task.difficulty}
                     </div>
                     <div className="task__name">{task.name}</div>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
};

export default Category;
