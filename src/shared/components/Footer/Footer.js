import { NavLink } from 'react-router-dom';

import './Footer.css';
import '../../util/css/Paragraph.css';

const noMore = [
   {
      textId: 1,
      text: 'Koniec z szukaniem platformy z zadaniami do nauki programowania.',
   },
   {
      textId: 2,
      text: 'Podział na kategorie oraz poziom trudności sprawia, że każdy znajdzie u nas coś dla siebie.',
   },
   {
      textId: 3,
      text: 'Szybka kompilacja kodu pozwala zauważyć błędy w kodzie.',
   },
   {
      textId: 4,
      text: 'Dostęp do dobrych rozwiązań o każdej porze dnia i nocy.',
   },
   {
      textId: 5,
      text: 'Dzięki rankingowi poczuć można nutkę rywalizacji i dreszczu emocji.',
   },
];

const footerOptions = [
   {
      optId: 1,
      text: 'Kontakt',
      to: '/contact',
   },
   {
      optId: 2,
      text: 'Ranking',
      to: '/ranks',
   },
   {
      optId: 3,
      text: 'Zadania',
      to: '/tasks/all',
   },
   {
      optId: 4,
      text: 'Historia Rozwiązań',
      to: '/solution-history',
   },
];

const Footer = () => {
   return (
      <footer className="main-footer">
         <div className="footer__content">
            <h2>Najlepszy sposób na naukę do rozmowy o pracę</h2>
            <ul className="nomore">
               {noMore.map((nomore) => (
                  <li className="nomore__list-item" key={nomore.textId}>
                     {nomore.text}
                  </li>
               ))}
            </ul>
            <hr />
            <div className="footer-options">
               {footerOptions.map((opt) => (
                  <NavLink
                     className="footer-options__navlink"
                     key={opt.optId}
                     to={opt.to}
                  >
                     {opt.text}
                  </NavLink>
               ))}
            </div>
            <hr />
            <p className="copyrights">
               Copyright &copy; 2022 AlgoSpace. All rights reserved.
            </p>
         </div>
      </footer>
   );
};

export default Footer;
