import './About.css';
import '../../shared/util/css/Paragraph.css';

import allInOne from '../../static/images/about/all-in-one.png';
import checkAnswer from '../../static/images/about/checking-answer.png';
import database from '../../static/images/about/database.png';
import rank from '../../static/images/about/rank.png';
import timeLimit from '../../static/images/about/time-limit.png';

const about = [
   {
      id: 1,
      img: allInOne,
      text: 'Dostęp do zadań podzielonych na kategorie',
      available: true,
   },
   {
      id: 2,
      img: checkAnswer,
      text: 'Weryfikacja wszystkich rozwiązań wraz z ich oceną',
      available: true,
   },
   {
      id: 3,
      img: database,
      text: 'Weryfikacja czy rozwiązanie nie wychodzi poza określone ramy alokacji pamięci',
      available: false,
   },
   {
      id: 4,
      img: rank,
      text: 'Ranking rozwiązań, oceniana jest liczba rozwiązanych zadań',
      available: false,
   },
   {
      id: 5,
      img: timeLimit,
      text: 'Weryfikacja czy rozwiązanie spełnia określone założenie czasowe',
      available: false,
   },
];

const About = () => {
   return (
      <div className="about">
         <div className="about__content">
            <ul className="about__unordered-list">
               {about.map((content) => (
                  <li key={content.id} className="about__list-item">
                     {!content.available && (
                        <div className="about-list-item__not-available"></div>
                     )}
                     <div className="list-item__content">
                        <img src={content.img} alt={content.text} />
                        <p className="paragraph--normal-font">{content.text}</p>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default About;
