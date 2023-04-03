import getLanguage from "../shared/utils/functions/getLanguage";

import type LanguageProps from "../types/languages";

const languageList: LanguageProps[] = [
  getLanguage("c++"),
  getLanguage("java"),
  getLanguage("python"),
  getLanguage("javascript"),
  getLanguage("kotlin"),
  getLanguage("ruby"),
  getLanguage("swift"),
  getLanguage("typescript"),
];

export default languageList;
