/* eslint-disable no-irregular-whitespace */
/* eslint-disable indent */
import i1 from "../../assets/img/Themes/1.png";
import i2 from "../../assets/img/Themes/2.png";
import i3 from "../../assets/img/Themes/3.png";
import i4 from "../../assets/img/Themes/4.png";
import i5 from "../../assets/img/Themes/5.png";
import i6 from "../../assets/img/Themes/6.png";
import i7 from "../../assets/img/Themes/7.png";
// import i8 from "../../assets/img/Themes/8.png";

export const themesList = [
  "Building a Sustainable Future",
  "Technology for Learning and Growth",
  "Health, Nutrition and Well-being",
  "Skills for Life and Livelihood",
  "Smarter Communities, Safer Futures",
  "Agriculture and Rural Transformation",
  "Open Category - Think Beyond"
];
export const focusareasList = {
  "Building a Sustainable Future": [
    "Green Energy",
    "Water Conservation & Management",
    "Eco-Friendly Innovation",
    "Biodiversity & Climate Action",
    "Green Agriculture",
  ],
  "Technology for Learning and Growth": [
    "Learning Tools & EdTech",
   "Inclusive and Accessible Learning",
    "Coding, AI & Data Innovation",
   "Gamified Learning",
    "Teacher Support Tools",
  ],
  "Health, Nutrition and Well-being": [
    "Low-cost Health Devices",
    "Mental Health Support",
    "Clean Nutrition Innovations",
   "Fitness & Movement" ,
    "Community Health Awareness",
  ],
  "Skills for Life and Livelihood": [
    "Vocational Skills & Local Craft",
    "Financial Literacy",
    "Entrepreneurship & Startups",
    "Future-Ready Skills",
     "Innovation in Retail & Distribution",
  ],
  "Smarter Communities, Safer Futures": [
    "Disaster Resilience",
   "Urban-Rural Mobility",
    "Public Space Innovation",
    "Smart Devices for Community Use",
    "Digital Governance",
  ],
  "Agriculture and Rural Transformation": [
    "Tech in Farming",
    "Farm-to-Table Innovation",
   "Rural Infrastructure",
   "Climate-Smart Farming",
    "Agri-Nutrition",
  ],
  "Open Category - Think Beyond": [
    "Any original or disruptive idea that addresses a real-world challenge",
  ],
};

export const themes = [
  {
    id: 1,
    image: i1,
    title: "themes.buildingtheme",
    focusareas: [
      "buildingfocusareas.focusarea1",
      "buildingfocusareas.focusarea2",
      "buildingfocusareas.focusarea3",
      "buildingfocusareas.focusarea4",
      "buildingfocusareas.focusarea5",
    ],
    desc: "themedetails.buildingtheme",
  },
  {
    id: 2,
    image: i2,
    title: "themes.technologytheme",
    focusareas: [
      "technologyfocusareas.focusarea1",
      "technologyfocusareas.focusarea2",

      "technologyfocusareas.focusarea3",

      "technologyfocusareas.focusarea4",

      "technologyfocusareas.focusarea5",

    ],
    desc: "themedetails.technologytheme",
  },
  {
    id: 3,
    image: i3,
    title: "themes.healththeme",
    focusareas: [
      "healthfocusareas.focusarea1",
      "healthfocusareas.focusarea2",
      "healthfocusareas.focusarea3",
      "healthfocusareas.focusarea4",
      "healthfocusareas.focusarea5",

    ],
    desc: "themedetails.healththeme",
  },
  {
    id: 4,
    image: i4,
    title: "themes.skillstheme",
    focusareas: [
      "skillsfocusareas.focusarea1",
      "skillsfocusareas.focusarea2",

      "skillsfocusareas.focusarea3",

      "skillsfocusareas.focusarea4",
      "skillsfocusareas.focusarea5",

    ],
    desc: "themedetails.skillstheme",
  },
  {
    id: 5,
    image: i5,
    title: "themes.smartertheme",
    focusareas: [
      "smarterfocusareas.focusarea1",
      "smarterfocusareas.focusarea2",
      "smarterfocusareas.focusarea3",
      "smarterfocusareas.focusarea4",
      "smarterfocusareas.focusarea5",

    ],
    desc: "themedetails.smartertheme",
  },
  {
    id: 6,
    image: i6,
    title: "themes.agriculturetheme",
    focusareas: [
      "agriculturefocusareas.focusarea1",
      "agriculturefocusareas.focusarea2",

      "agriculturefocusareas.focusarea3",

      "agriculturefocusareas.focusarea4",

      "agriculturefocusareas.focusarea5",

    ],
    desc: "themedetails.agriculturetheme",
  },
  {
    id: 7,
    image: i7,
    title: "themes.opentheme",
    focusareas: ["openfocusareas.focusarea1"],
    desc: "themedetails.opentheme",
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
