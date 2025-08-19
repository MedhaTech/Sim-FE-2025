/* eslint-disable no-irregular-whitespace */
/* eslint-disable indent */
import i1 from "../../assets/img/Themes/1.png";
import i2 from "../../assets/img/Themes/2.png";
import i3 from "../../assets/img/Themes/3.png";
import i4 from "../../assets/img/Themes/4.png";
import i5 from "../../assets/img/Themes/5.png";
import i6 from "../../assets/img/Themes/6.png";
import i7 from "../../assets/img/Themes/7.png";
import i8 from "../../assets/img/Themes/8.png";

export const themesList = [
  "Health & Wellness",
  "Women & Child Development",
  "Water",
  "Lifestyle for Environment (LiFE)",
  "Cultural Pride",
  "Tribal Empowerment",
  "Future-Ready Skills",
  "Local Community Problems (Open Innovation)",
];
export const themeTranslationKeys = {
  "Health & Wellness": "themes.healthwellnesstheme",
  "Women & Child Development": "themes.womenchildtheme",
  "Water": "themes.watertheme",
  "Lifestyle for Environment (LiFE)": "themes.lifestyletheme",
  "Cultural Pride": "themes.culturaltheme",
  "Tribal Empowerment": "themes.tribaltheme",
  "Future-Ready Skills": "themes.futuretheme",
  "Local Community Problems (Open Innovation)": "themes.localtheme",
};
export const focusareasListTranslationKeys = {
  healthwellnesstheme: [
    {
      value: "Devices for Fitness and Preventive Health",
      labelKey: "healthwellnessfocusareas.focusarea1",
    },
    {
      value: "Mental Health Support",
      labelKey: "healthwellnessfocusareas.focusarea2",
    },
    {
      value: "Assistive Tech for the specially abled",
      labelKey: "healthwellnessfocusareas.focusarea3",
    },
  ],
  womenchildtheme: [
    {
      value: "Menstrual Health and Hygiene Solutions",
      labelKey: "womenchildfocusareas.focusarea1",
    },
    {
      value: "Early Learning and Educational Tools",
      labelKey: "womenchildfocusareas.focusarea2",
    },
    {
      value: "Safety and Support Devices for Children and Women",
      labelKey: "womenchildfocusareas.focusarea3",
    },
  ],
  watertheme: [
    {
      value: "Water Conservation & Sanitation",
      labelKey: "waterfocusareas.focusarea1",
    },
    {
      value: "Solutions for Water Pollution",
      labelKey: "waterfocusareas.focusarea2",
    },
    {
      value: "Enhancement of Water-Based Livelihoods",
      labelKey: "waterfocusareas.focusarea3",
    },
  ],
  lifestyletheme: [
    {
      value: "Green Energy and Climate Action",
      labelKey: "lifestylefocusareas.focusarea1",
    },
    {
      value: "Sustainable Modes of Transport",
      labelKey: "lifestylefocusareas.focusarea2",
    },
    {
      value: "Recycling and Waste Management",
      labelKey: "lifestylefocusareas.focusarea3",
    },
  ],
  culturaltheme: [
    {
      value: "Innovation in Arts, Music & Folk Traditions",
      labelKey: "culturalfocusareas.focusarea1",
    },
    {
      value: "Promotion of Indigenous and Local Sports",
      labelKey: "culturalfocusareas.focusarea2",
    },
    {
      value: "Tools for Preserving Regional and Endangered Languages",
      labelKey: "culturalfocusareas.focusarea3",
    },
  ],
  tribaltheme: [
    {
      value: "Preservation of Tribal Identity & Culture",
      labelKey: "tribalfocusareas.focusarea1",
    },
    {
      value: "Products using Tribal Techniques",
      labelKey: "tribalfocusareas.focusarea2",
    },
    {
      value: "Smart Solutions for Tribal & Hilly Regions",
      labelKey: "tribalfocusareas.focusarea3",
    },
  ],
  futuretheme: [
    {
      value: "Digital Tools for Learning and Skilling",
      labelKey: "futurefocusareas.focusarea1",
    },
    {
      value: "Entrepreneurship and Local Livelihood Innovation",
      labelKey: "futurefocusareas.focusarea2",
    },
    {
      value: "Career Awareness and Job-Readiness Solutions",
      labelKey: "futurefocusareas.focusarea3",
    },
  ],
  localtheme: [
    {
      value: "Other",
      labelKey: "localfocusareas.focusarea1",
    },
   
  ],
};


export const focusareasList = {
  "Health & Wellness": [
    "Devices for Fitness and Preventive Health",
    "Mental Health Support",
    "Assistive Tech for the specially abled",
  ],
  "Women & Child Development": [
    "Menstrual Health and Hygiene Solutions",
    "Early Learning and Educational Tools",
    "Safety and Support Devices for Children and Women",
  ],
  Water: [
    "Water Conservation & Sanitation",
    "Solutions for Water Pollution",
    "Enhancement of Water-Based Livelihoods",
  ],
  "Lifestyle for Environment (LiFE)": [
    "Green Energy and Climate Action",
    "Sustainable Modes of Transport",
    "Recycling & Waste Management",
  ],
  "Cultural Pride": [
    "Innovation in Arts, Music & Folk Traditions",
    "Promotion of Indigenous and Local Sports",
    "Tools for Preserving Regional and Endangered Languages",
  ],
  "Tribal Empowerment": [
    "Preservation of Tribal Identity & Culture",
    "Products using Tribal Techniques",
    "Smart Solutions for Tribal & Hilly Regions",
  ],
  "Future-Ready Skills": [
    "Digital Tools for Learning and Skilling",
    "Entrepreneurship and Local Livelihood Innovation",
    "Career Awareness and Job-Readiness Solutions",
  ],
  "Local Community Problems (Open Innovation)": [
    "Other",
   
  ],
};




export const themes = [
  {
    id: 1,
    image: i1,
    title: "themes.healthwellnesstheme",
    focusareas: [
      "healthwellnessfocusareas.focusarea1",
      "healthwellnessfocusareas.focusarea2",
      "healthwellnessfocusareas.focusarea3",
    ],
  },
  {
    id: 2,
    image: i2,
    title: "themes.womenchildtheme",
    focusareas: [
      "womenchildfocusareas.focusarea1",
      "womenchildfocusareas.focusarea2",
      "womenchildfocusareas.focusarea3",
    ],
  },
  {
    id: 3,
    image: i3,
    title: "themes.watertheme",
    focusareas: [
      "waterfocusareas.focusarea1",
      "waterfocusareas.focusarea2",
      "waterfocusareas.focusarea3",
    ],
  },
  {
    id: 4,
    image: i4,
    title: "themes.lifestyletheme",
    focusareas: [
      "lifestylefocusareas.focusarea1",
      "lifestylefocusareas.focusarea2",
      "lifestylefocusareas.focusarea3",
    ],
  },
  {
    id: 5,
    image: i5,
    title: "themes.culturaltheme",
    focusareas: [
      "culturalfocusareas.focusarea1",
      "culturalfocusareas.focusarea2",
      "culturalfocusareas.focusarea3",
    ],
  },
  {
    id: 6,
    image: i6,
    title: "themes.tribaltheme",
    focusareas: [
      "tribalfocusareas.focusarea1",
      "tribalfocusareas.focusarea2",

      "tribalfocusareas.focusarea3",
    ],
  },
  {
    id: 7,
    image: i7,
    title: "themes.futuretheme",
    focusareas: [
      "futurefocusareas.focusarea1",
      "futurefocusareas.focusarea2",
      "futurefocusareas.focusarea3",
    ],
  },
   {
    id: 8,
    image: i8,
    title: "themes.localtheme",
    focusareas: [
      "localfocusareas.focusarea1",
    ],
  },
];

export const questions = [
  { qid: 1, title: "Select a theme which relates to your idea" },
  { qid: 2, title: "Select focus area" },
  { qid: 3, title: "Describe your problem statement" },
  { qid: 4, title: "Give a Title to your IDEA" },
  { qid: 5, title: "Describe your Idea in detail" },
  { qid: 6, title: "Share video link of your idea prototype" },
];
