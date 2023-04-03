import cpp from "../../../static/images/languages/c++.png";
import java from "../../../static/images/languages/java.png";
import javascript from "../../../static/images/languages/javaScript.png";
import kotlin from "../../../static/images/languages/kotlin.png";
import python from "../../../static/images/languages/python.png";
import ruby from "../../../static/images/languages/ruby.png";
import swift from "../../../static/images/languages/swift.png";
import typescript from "../../../static/images/languages/typescript.png";

import type LanguageProps from "../../../types/languages";

const getLanguage = (name: string): LanguageProps => {
  switch (name.toLowerCase()) {
    case "c++":
      return {
        img: cpp,
        langName: "C++",
        text: `Dla wszystkich miłośników old school'u`,
        available: true,
      };

    case "java":
      return {
        img: java,
        langName: "Java",
        text: "Dla wszystkich masochistów ;)",
        available: true,
      };

    case "python":
      return {
        img: python,
        langName: "Python",
        text: "Dla wszystkich miłośników Data Science",
        available: true,
      };

    case "javascript":
      return {
        img: javascript,
        langName: "JavaScript",
        text: "Dla wszystkich miłośników frontendu",
        available: false,
      };

    case "kotlin":
      return {
        img: kotlin,
        langName: "Kotlin",
        text: "Dla wszystkich miłośników Androida",
        available: false,
      };

    case "ruby":
      return {
        img: ruby,
        langName: "Ruby",
        text: "Dla wszystkich miłośników minimalizmu",
        available: false,
      };

    case "swift":
      return {
        img: swift,
        langName: "Swift",
        text: `Dla wszystkich miłośników iOS'a`,
        available: false,
      };

    case "typescript":
      return {
        img: typescript,
        langName: "TypeScript",
        text: "Dla wszystkich miłośników harmonii",
        available: false,
      };

    default:
      throw new Error(`Wrong language name: ${name}`);
  }
};

export default getLanguage;
