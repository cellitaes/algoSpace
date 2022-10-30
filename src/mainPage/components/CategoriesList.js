import './CategoriesList.css';
import '../../shared/util/css/Paragraph.css';
import { useEffect, useState } from 'react';
import { useHttpClient } from '../../shared/hooks/httpHook';

import { URL } from '../../config';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

const futureCategories = [
   {
      categoryId: 12,
      translation: 'grafy',
      futureCategory: true,
   },
   {
      categoryId: 13,
      translation: 'drzewa',
      futureCategory: true,
   },
   {
      categoryId: 15,
      translation: 'listy łączone',
      futureCategory: true,
   },
   {
      categoryId: 16,
      translation: 'drzewa binarne',
      futureCategory: true,
   },
   {
      categoryId: 17,
      translation: 'łancuchy znakowe',
      futureCategory: true,
   },
   {
      categoryId: 18,
      translation: 'programowanie dynamiczne',
      futureCategory: true,
   },
   {
      categoryId: 19,
      translation: 'przeszukiwanie',
      futureCategory: true,
   },
   {
      categoryId: 111,
      translation: 'algorytmy zachłanne',
      futureCategory: true,
   },
   {
      categoryId: 113,
      translation: 'znane algorytmy',
      futureCategory: true,
   },
   {
      categoryId: 114,
      translation: 'przeszukiwanie drzew binarnych',
      futureCategory: true,
   },
   {
      categoryId: 115,
      translation: 'kopce',
      futureCategory: true,
   },
];

const CategoriesList = () => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const [categories, setCategories] = useState([]);
   const [tasks, setTasks] = useState([]);

   useEffect(() => {
      const getCategoriesAndTasks = async () => {
         let url = `${URL}/categories`;
         const fetchedCategories = await sendRequest(url);
         setCategories([...fetchedCategories, ...futureCategories]);

         url = `${URL}/tasks`;
         const allTasks = await sendRequest(url);
         setTasks(allTasks);
      };
      getCategoriesAndTasks();
   }, []);

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="categories">
            <div className="categories__introduction">
               <h1>
                  {tasks.length} zadań obejmujących{' '}
                  {categories.length - futureCategories.length + ' '}
                  kategorii.
               </h1>
               <p className="paragraph--color-primay categories__description--spacing paragraph--justify paragraph--normal-font">
                  Jeśli chcesz dobrze wypaść na rozmowach o pracę, być dobrze
                  zorientowanym we wszystkich typowych strukturach danych i
                  popularnych metodach rozwiązywania problemów jest to miejsce
                  idealne dla Ciebie.
               </p>
            </div>
            <ul className="categories__unorderd-list">
               {categories.map((category) => (
                  <li
                     key={category.categoryId}
                     className={`categories__list-item center ${
                        category.futureCategory && 'category-disabled'
                     }`}
                  >
                     <p className="paragraph--color-secondary paragraph--normal-font">
                        {category.translation}
                     </p>
                  </li>
               ))}
            </ul>
         </div>
      </>
   );
};

export default CategoriesList;
