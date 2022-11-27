import { NavLink } from 'react-router-dom';

import './Footer.css';
import '../../util/css/Paragraph.css';

const noMore = [
   {
      textId: 1,
      text: 'Nigdy więcej wiadomości, które zostają zignorowane.',
   },
   {
      textId: 2,
      text: 'Nigdy więcej nieprzespanych i zarawanych nocy.',
   },
   {
      textId: 3,
      text: 'Nigdy więcej podań o pracę, na które nikt nie zwraca uwagi.',
   },
   {
      textId: 4,
      text: 'Nigdy więcej uczucia bezradności w trakcie rozmowy rekrutacyjnej.',
   },
   {
      textId: 5,
      text: 'Nigdy więcej zadań kwalifikacyjnych, których nie potrafisz rozwiązań.',
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
