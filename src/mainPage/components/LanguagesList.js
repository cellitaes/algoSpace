import cpp from '../../static/images/languages/c++.png';
import java from '../../static/images/languages/java.png';
import javascript from '../../static/images/languages/javaScript.png';
import kotlin from '../../static/images/languages/kotlin.png';
import python from '../../static/images/languages/python.png';
import ruby from '../../static/images/languages/ruby.png';
import swift from '../../static/images/languages/swift.png';
import typescript from '../../static/images/languages/typescript.png';

import './LanguagesList.css';
import '../../shared/util/css/Paragraph.css';

const languagesList = [
   {
      id: 1,
      img: cpp,
      langName: 'C++',
      text: `Dla wszystkich miłośników old school'u`,
      available: true,
   },
   {
      id: 2,
      img: java,
      langName: 'Java',
      text: 'Dla wszystkich masochistów ;)',
      available: true,
   },
   {
      id: 5,
      img: python,
      langName: 'Python',
      text: 'Dla wszystkich miłośników Data Science',
      available: true,
   },
   {
      id: 3,
      img: javascript,
      langName: 'JavaScript',
      text: 'Dla wszystkich miłośników frontendu',
      available: false,
   },
   {
      id: 4,
      img: kotlin,
      langName: 'Kotlin',
      text: 'Dla wszystkich miłośników Androida',
      available: false,
   },
   {
      id: 6,
      img: ruby,
      langName: 'Ruby',
      text: 'Dla wszystkich miłośników minimalizmu',
      available: false,
   },
   {
      id: 7,
      img: swift,
      langName: 'Swift',
      text: `Dla wszystkich miłośników iOS'a`,
      available: false,
   },
   {
      id: 8,
      img: typescript,
      langName: 'TypeScript',
      text: 'Dla wszystkich miłośników harmonii',
      available: false,
   },
];

const LanguagesList = () => {
   return (
      <div className="languages-container">
         <div className="languages-container__content">
            <h3 className="languages-container__title">
               Możliwość testowania kodu w aż 3 językach
            </h3>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
               Nie ma nic bardziej frustrującego niż otwarcie książki
               przygotowującej do rozmowy kwalifikacyjnej, tylko po to, by
               znaleźć kilka rozwiązań w języku programowania, którego nie
               znasz. Dlatego wszystkie nasze zadania można napisać w aż 3
               popularnych językach.
            </p>
            <ul className="languages-list">
               {languagesList.map((lang) => (
                  <li className="list-item" key={lang.id}>
                     {!lang.available && (
                        <div className="list-item__not-available"></div>
                     )}
                     <img
                        className="list-item__image"
                        src={lang.img}
                        alt={lang.langName}
                     />
                     <p className="paragraph--color-white paragraph--align-left">
                        <span
                           className="highlight--secondary"
                           style={{
                              fontFamily: 'monospace',
                              fontSize: '1.1rem',
                           }}
                        >
                           {lang.langName},{' '}
                        </span>
                        {lang.text}
                     </p>
                  </li>
               ))}
            </ul>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
               W idealnym świecie przygotowujesz się do rozmów kwalifikacyjnych
               na temat kodowania, pisząc rozwiązania problemów w wybranym przez
               siebie języku, uzyskując w razie potrzeby kilka wskazówek,
               uruchamiając kod w oparciu o przypadki testowe i patrząc na
               poprawność rozwiązania po zakończeniu.
            </p>
            <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
               Przekształciliśmy ten idealny świat w prawdziwy świat. Wybierz
               język. Przeczytaj wprowadzenie do zadania oraz zapoznaj się z
               kryteriami testowymi. Napisz swoje rozwiązanie. Uruchom swój kod.
               Uzyskaj kilka wskazówek. Skompiluj kod. Uruchom kod ponownie.
               Sprawdź dane wyjściowe. Zdaj testy. Uzyskaj pozytywną ocenę
               rozwiązanego zadania!
            </p>
         </div>
      </div>
   );
};

export default LanguagesList;
