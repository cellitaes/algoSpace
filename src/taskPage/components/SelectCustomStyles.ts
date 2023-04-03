import { StylesConfig, GroupBase, CSSObjectWithLabel } from "react-select";

import { Language } from "../pages/ConfirmChoice";

export const customStyles = (
  theme: string
): StylesConfig<Language, false, GroupBase<Language>> => ({
  control: (styles: CSSObjectWithLabel) => ({
    ...styles,
    borderRadius: "5px",
    textAlign: "left",
    color: theme === "light" ? "#000" : "#fff",
    backgroundColor: theme === "light" ? "#fff" : "#032538",
    cursor: "pointer",
    border: `2px solid ${theme === "light" ? "#000" : "#fff"}`,
  }),
  option: (styles: CSSObjectWithLabel) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.8rem",
      textAlign: "left",
      lineHeight: "1.75rem",
      background: "#fff",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  singleValue: (style: CSSObjectWithLabel) => {
    return {
      ...style,
      color: theme === "light" ? "#000" : "#fff",
    };
  },
  menu: (styles: CSSObjectWithLabel) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      color: "#fff",
      border: "2px solid #000000",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles: CSSObjectWithLabel) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
});
