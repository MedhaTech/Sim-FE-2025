/* eslint-disable indent */
export const languageOptions = [
  {
    code: "en",
    name: "English",
    country_code: "in",
  },
  {
    code: "tn",
    name: "தமிழ்",
    country_code: "in",
  },
  {
    code: "hi",
    name: "हिन्दी",
    country_code: "in",
  },
  {
    code: "te",
    name: "తెలుగు",
    country_code: "in",
  },
  {
    code: "ka",
    name: "ಕನ್ನಡ",
    country_code: "in",
  },
  {
    code: "mal",
    name: "മലയാളം",
    country_code: "in",
  },

  // {
  //     code: process.env.REACT_APP_LOCAL_LANGUAGE_CODE,
  //     name: process.env.REACT_APP_LOCAL_LANGUAGE_NAME,
  //     country_code: 'in'
  // }
];

export const getLanguage = (lang) => {
  if (lang?.code == "en" || lang?.code == "" || lang?.code == undefined) {
    return `en`;
  } else if (lang?.code == "hi") {
    return `hi`;
  } else if (lang?.code == "te") {
    return `te`;
  } else if (lang?.code == "ka") {
    return `ka`;
  } else if (lang?.code == "tn") {
    return `tn`;
  } else if (lang?.code == "mal") {
    return `mal`;
  } else {
    return `en`;
  }
};
