import "./LanguagesList.css";
import "../../shared/utils/css/Paragraph.css";

import languageList from "../../constants/languages";

const LanguagesList = () => {
  return (
    <div className="languages-container">
      <div className="languages-container__content">
        <h3 className="languages-container__title">
          Możliwość testowania kodu w aż 3 językach
        </h3>
        <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
          Nie ma nic bardziej frustrującego niż otwarcie książki przygotowującej
          do rozmowy kwalifikacyjnej, tylko po to, by znaleźć kilka rozwiązań w
          języku programowania, którego nie znasz. Dlatego wszystkie nasze
          zadania można napisać w aż 3 popularnych językach.
        </p>
        <ul className="languages-list">
          {languageList.map((lang) => (
            <li className="list-item" key={lang.langName}>
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
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                  }}
                >
                  {lang.langName},{" "}
                </span>
                {lang.text}
              </p>
            </li>
          ))}
        </ul>
        <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
          W idealnym świecie przygotowujesz się do rozmów kwalifikacyjnych na
          temat kodowania, pisząc rozwiązania problemów w wybranym przez siebie
          języku, uzyskując w razie potrzeby kilka wskazówek, uruchamiając kod w
          oparciu o przypadki testowe i patrząc na poprawność rozwiązania po
          zakończeniu.
        </p>
        <p className="paragraph--padding-sx paragraph--color-white paragraph--justify paragraph--normal-font">
          Przekształciliśmy ten idealny świat w prawdziwy świat. Wybierz język.
          Przeczytaj wprowadzenie do zadania oraz zapoznaj się z kryteriami
          testowymi. Napisz swoje rozwiązanie. Uruchom swój kod. Uzyskaj kilka
          wskazówek. Skompiluj kod. Uruchom kod ponownie. Sprawdź dane
          wyjściowe. Zdaj testy. Uzyskaj pozytywną ocenę rozwiązanego zadania!
        </p>
      </div>
    </div>
  );
};

export default LanguagesList;
