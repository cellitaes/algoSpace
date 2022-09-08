import Paragraph from '../../shared/components/UIElements/Paragraph';

import './CategoriesList.css';

const categories = [
   {
      id: 1,
      name: 'tablice',
   },
   {
      id: 2,
      name: 'grafy',
   },
   {
      id: 3,
      name: 'drzewa',
   },
   {
      id: 4,
      name: 'stosy',
   },
   {
      id: 5,
      name: 'listy łączone',
   },
   {
      id: 6,
      name: 'drzewa binarne',
   },
   {
      id: 7,
      name: 'łancuchy znakowe',
   },
   {
      id: 8,
      name: 'programowanie dynamiczne',
   },
   {
      id: 9,
      name: 'przeszukiwanie',
   },
   {
      id: 10,
      name: 'sortowanie',
   },
   {
      id: 11,
      name: 'algorytmy zachłanne',
   },
   {
      id: 12,
      name: 'rekurscja',
   },
   {
      id: 13,
      name: 'znane algorytmy',
   },
   {
      id: 14,
      name: 'przeszukiwanie drzew binarnych',
   },
   {
      id: 15,
      name: 'tablice',
   },
];

const CategoriesList = () => {
   return (
      <div className="categories">
         <div className="categories__introduction">
            <h1>160 pytań obejmujących 15 kategorii.</h1>
            <Paragraph primary={true}>
               Jeśli chcesz dobrze wypaść na rozmowach o pracę, być dobrze
               zorientowanym we wszystkich typowych strukturach danych i
               popularnych metodach rozwiązywania problemów jest to miejsce
               idealne dla Ciebie.
            </Paragraph>
         </div>
         <ul className="categories__unorderd-list">
            {categories.map((category) => (
               <div className="categories__container">
                  <div className="categories__innercontainer">
                     <li
                        key={category.id}
                        className="categories__list-item center front face"
                     >
                        <Paragraph secondary={true}>{category.name}</Paragraph>
                     </li>
                     <li
                        key={`${category.id} ${category.name}`}
                        className="categories__list-item center back face ceneter"
                     >
                        <Paragraph secondary={true}>{category.name}</Paragraph>
                     </li>
                  </div>
               </div>
            ))}
         </ul>
      </div>
   );
};

export default CategoriesList;
