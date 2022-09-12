import cpp from '../../static/images/languages/c++.png';
import java from '../../static/images/languages/java.png';
import javascript from '../../static/images/languages/javaScript.png';
import kotlin from '../../static/images/languages/kotlin.png';
import python from '../../static/images/languages/python.png';
import ruby from '../../static/images/languages/ruby.png';
import swift from '../../static/images/languages/swift.png';
import typescript from '../../static/images/languages/typescript.png';

import './LanguagesList.css';
import '../../shared/util/Paragraph.css';

const languagesList = [
   {
      id: 1,
      img: cpp,
      langName: 'C++',
      text: `for all you Old Schoolers++`,
   },
   {
      id: 2,
      img: java,
      langName: 'Java',
      text: 'for all you Masochists',
   },
   {
      id: 3,
      img: javascript,
      langName: 'JavaScript',
      text: 'for all you Front-End Developers',
   },
   { id: 4, img: kotlin, langName: 'Kotlin', text: 'for all you Androiders' },
   {
      id: 5,
      img: python,
      langName: 'Python',
      text: 'for all you Data Scientists',
   },
   { id: 6, img: ruby, langName: 'Ruby', text: 'for all you minimalists' },
   { id: 7, img: swift, langName: 'Swift', text: 'for all you iOS Engineers' },
   {
      id: 8,
      img: typescript,
      langName: 'TypeScript',
      text: 'for all you Edgy JavaScripters',
   },
];

const LanguagesList = () => {
   return (
      <div className="languages-container">
         <div className="languages-container__content">
            <h3 className="languages-container__title">
               Możliwość testowania kodu w aż 8 językach
            </h3>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify">
               Nie ma nic bardziej frustrującego niż otwarcie książki
               przygotowującej do rozmowy kwalifikacyjnej, tylko po to, by
               znaleźć kilka rozwiązań w języku programowania, którego nie
               znasz. Dlatego wszystkie nasze pytania zawierają kompletne
               rozwiązania pisemne w 8 popularnych językach.
            </p>
            <ul className="languages-list">
               {languagesList.map((lang) => (
                  <li className="list-item" key={lang.id}>
                     <img
                        className="list-item__image"
                        src={lang.img}
                        alt={lang.langName}
                     />
                     <p className="paragraph--color-white paragraph--align-left">
                        <span className="highlight--secondary">
                           {lang.langName},{' '}
                        </span>
                        {lang.text}
                     </p>
                  </li>
               ))}
            </ul>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify">
               W idealnym świecie przygotowujesz się do rozmów kwalifikacyjnych
               na temat kodowania, pisząc rozwiązania problemów w wybranym przez
               siebie języku, uzyskując w razie potrzeby kilka wskazówek,
               uruchamiając kod w oparciu o przypadki testowe i patrząc na
               rozwiązania po zakończeniu.
            </p>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify">
               Przekształciliśmy ten idealny świat w prawdziwy świat. Wybierz
               język. Przeczytaj monit. Napisz swoje rozwiązanie. Uruchom swój
               kod. Uzyskaj kilka wskazówek. Uruchom kod ponownie. Sprawdź dane
               wyjściowe. Zdaj testy. Zobacz nasze rozwiązanie. Obejrzyj nasz
               film. Wszystko w tej samej przestrzeni roboczej.
            </p>
         </div>
      </div>
   );
};

export default LanguagesList;
