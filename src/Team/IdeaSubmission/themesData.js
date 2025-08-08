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
      value: "Mental Health and Well-being",
      labelKey: "healthwellnessfocusareas.focusarea2",
    },
    {
      value: "Nutrition and Diet Tracking",
      labelKey: "healthwellnessfocusareas.focusarea3",
    },
  ],
  womenchildtheme: [
    {
      value: "Maternal Health Support",
      labelKey: "womenchildfocusareas.focusarea1",
    },
    {
      value: "Child Safety & Education",
      labelKey: "womenchildfocusareas.focusarea2",
    },
    {
      value: "Women Empowerment Platforms",
      labelKey: "womenchildfocusareas.focusarea3",
    },
  ],
  watertheme: [
    {
      value: "Water Conservation Technology",
      labelKey: "waterfocusareas.focusarea1",
    },
    {
      value: "Clean Drinking Water Solutions",
      labelKey: "waterfocusareas.focusarea2",
    },
    {
      value: "Smart Irrigation Systems",
      labelKey: "waterfocusareas.focusarea3",
    },
  ],
  lifestyletheme: [
    {
      value: "Eco-friendly Packaging",
      labelKey: "lifestylefocusareas.focusarea1",
    },
    {
      value: "Sustainable Fashion",
      labelKey: "lifestylefocusareas.focusarea2",
    },
    {
      value: "Recycling and Waste Management",
      labelKey: "lifestylefocusareas.focusarea3",
    },
  ],
  culturaltheme: [
    {
      value: "Digital Preservation of Heritage",
      labelKey: "culturalfocusareas.focusarea1",
    },
    {
      value: "Promoting Indigenous Art",
      labelKey: "culturalfocusareas.focusarea2",
    },
    {
      value: "Cultural Education Platforms",
      labelKey: "culturalfocusareas.focusarea3",
    },
  ],
  tribaltheme: [
    {
      value: "Tribal Skill Development",
      labelKey: "tribalfocusareas.focusarea1",
    },
    {
      value: "Healthcare Access for Tribals",
      labelKey: "tribalfocusareas.focusarea2",
    },
    {
      value: "Market Linkages for Tribal Products",
      labelKey: "tribalfocusareas.focusarea3",
    },
  ],
  futuretheme: [
    {
      value: "Coding and Robotics",
      labelKey: "futurefocusareas.focusarea1",
    },
    {
      value: "AI and Machine Learning Education",
      labelKey: "futurefocusareas.focusarea2",
    },
    {
      value: "21st Century Soft Skills",
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
