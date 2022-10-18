import { NavLink } from 'react-router-dom';
import PublicRoute from '../../Routes/PublicRoute';

import Category from '../components/Category';

import './Categories.css';

const categories = [
   {
      id: 0,
      name: 'wszystkie',
      to: 'all',
   },
   {
      id: 1,
      name: 'tablice',
      to: 'arrays',
   },
   {
      id: 2,
      name: 'grafy',
      to: 'graphs',
   },
   {
      id: 3,
      name: 'drzewa',
      to: 'tries',
   },
   {
      id: 4,
      name: 'stosy',
      to: 'stack',
   },
   {
      id: 5,
      name: 'listy łączone',
      to: 'linked-lists',
   },
   {
      id: 6,
      name: 'drzewa binarne',
      to: 'binary-trees',
   },
   {
      id: 7,
      name: 'łancuchy znakowe',
      to: 'strings',
   },
   {
      id: 8,
      name: 'programowanie dynamiczne',
      to: 'dynamic-programming',
   },
   {
      id: 9,
      name: 'przeszukiwanie',
      to: 'searching',
   },
   {
      id: 10,
      name: 'sortowanie',
      to: 'sorting',
   },
   {
      id: 11,
      name: 'algorytmy zachłanne',
      to: 'greedy-algorithms',
   },
   {
      id: 12,
      name: 'rekurscja',
      to: 'recursion',
   },
   {
      id: 13,
      name: 'znane algorytmy',
      to: 'famous-algorithms',
   },
   {
      id: 14,
      name: 'przeszukiwanie drzew binarnych',
      to: 'binary-search-trees',
   },
   {
      id: 15,
      name: 'kopce',
      to: 'heap',
   },
];

const Categories = () => {
   return (
      <div className="categories-container center">
         <div className="categories-layout">
            <div className="categories-list">
               {categories.map((cat) => (
                  <div key={cat.to} className="categories-list__item">
                     <NavLink to={`/categories/${cat.to}`}>{cat.name}</NavLink>
                  </div>
               ))}
            </div>
            <div className="category-tasks">
               <Category />
            </div>
         </div>
      </div>
   );
};

export default Categories;
