import allInOne from "../../../static/images/about/all-in-one.png";
import checkAnswer from "../../../static/images/about/checking-answer.png";
import database from "../../../static/images/about/database.png";
import rank from "../../../static/images/about/rank.png";
import timeLimit from "../../../static/images/about/time-limit.png";

import type FeatureProps from "../../../types/features";

const getFeature = (name: string): FeatureProps => {
  switch (name.toLowerCase()) {
    case "allinone":
      return {
        id: 1,
        img: allInOne,
        text: "Dostęp do zadań podzielonych na kategorie",
        available: true,
      };

    case "checkanswer":
      return {
        id: 2,
        img: checkAnswer,
        text: "Weryfikacja wszystkich rozwiązań wraz z ich oceną",
        available: true,
      };

    case "database":
      return {
        id: 3,
        img: database,
        text: "Weryfikacja czy rozwiązanie nie wychodzi poza określone ramy alokacji pamięci",
        available: false,
      };

    case "rank":
      return {
        id: 4,
        img: rank,
        text: "Ranking rozwiązań, oceniana jest liczba rozwiązanych zadań",
        available: false,
      };

    case "timelimit":
      return {
        id: 5,
        img: timeLimit,
        text: "Weryfikacja czy rozwiązanie spełnia określone założenie czasowe",
        available: false,
      };

    default:
      throw new Error(`Wrong feature name: ${name}`);
  }
};

export default getFeature;
