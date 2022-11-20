import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/httpHook';

import Category from '../components/Category';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import './Categories.css';
import { AuthContext } from '../../shared/context/AuthContext.js';
import { URL } from '../../config';

const Categories = () => {
   const { isLoading, error, sendRequest, clearError } = useHttpClient();

   const { token } = useContext(AuthContext);

   const [categories, setCategories] = useState([
      { categoryId: 'ALL', translation: 'Wszystkie' },
   ]);

   useEffect(() => {
      const getCategories = async () => {
         const url = `${URL}/categories`;
         const method = 'GET';
         const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         };
         const body = null;

         const fetchedCategories = await sendRequest(
            url,
            method,
            body,
            headers
         );
         setCategories([...categories, ...fetchedCategories.data]);
      };
      getCategories();
   }, []);

   return (
      <>
         {isLoading && <LoadingSpinner asOverlay />}
         {error && <ErrorModal error={error} onClear={clearError} />}
         <div className="categories-container center">
            <div className="categories-layout">
               <div className="categories-list">
                  {categories.map((cat) => (
                     <div
                        key={cat.categoryId}
                        className="categories-list__item"
                     >
                        <NavLink to={`/tasks/${cat.categoryId.toLowerCase()}`}>
                           {cat.translation}
                        </NavLink>
                     </div>
                  ))}
               </div>
               <div className="category-tasks">
                  <Category />
               </div>
            </div>
         </div>
      </>
   );
};

export default Categories;
