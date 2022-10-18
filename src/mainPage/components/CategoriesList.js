import './CategoriesList.css';
import '../../shared/util/Paragraph.css';

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

const CategoriesList = () => {
   return (
      <div className="categories">
         <div className="categories__introduction">
            <h1>160 pytań obejmujących 15 kategorii.</h1>
            <p className="paragraph--color-primay categories__description--spacing paragraph--justify paragraph--normal-font">
               Jeśli chcesz dobrze wypaść na rozmowach o pracę, być dobrze
               zorientowanym we wszystkich typowych strukturach danych i
               popularnych metodach rozwiązywania problemów jest to miejsce
               idealne dla Ciebie.
            </p>
         </div>
         <ul className="categories__unorderd-list">
            {categories.map((category) => (
               <div className="categories__container" key={category.id}>
                  <div className="categories__innercontainer">
                     <li
                        key={category.id}
                        className="categories__list-item center front face"
                     >
                        <p className="paragraph--color-secondary paragraph--normal-font">
                           {category.name}
                        </p>
                     </li>
                     <li
                        key={`${category.id} ${category.name}`}
                        className="categories__list-item center back face ceneter"
                     >
                        <p className="paragraph--color-secondary paragraph--normal-font">
                           {category.name}
                        </p>
                     </li>
                  </div>
               </div>
            ))}
         </ul>
      </div>
   );
};

export default CategoriesList;
