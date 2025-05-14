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
"Sustainable Development and Environment",
 "Digital Transformation",
    "Health and Well-being",
    "Quality Education",
    "Economic Empowerment",
    "Smart and Resilient Communities",
    "Agriculture and Rural Development",
    "Others"
];
export const focusareasList = {
    "Sustainable Development and Environment": [
        "Renewable Energy (e.g., solar, wind, hydro)",
        "Waste Management (e.g., recycling, composting)",
        "Clean Water (e.g., water purification, rainwater harvesting)",
        "Environment Protection (e.g., pollution control, reforestation)",
        "Sustainable Agriculture (e.g., organic farming, soil conservation)",
        "Others"
    ],
    "Digital Transformation": [
        "Internet of Things (IoT) (e.g., smart homes, connected devices)",
        "Information Technology (e.g., software, apps)",
        "Cybersecurity (e.g., protecting data, secure online practices)",
        "Blockchain (e.g., secure transactions, decentralized systems)",
        "Artificial Intelligence (AI) and Machine Learning (ML) (e.g., smart assistants, predictive analytics)",
        "Others"
    ],
    "Health and Well-being" : [
        "Medical Devices (e.g., health monitors, diagnostic tools)",
        "Nutrition and Healthy Eating (e.g., balanced diets, fortified foods)",
        "Mental Health (e.g., stress management, counseling tools)",
        "Fitness and Sports (e.g., exercise programs, sports innovations)",
        "Others"
    ],
    "Quality Education" : [
        "Online Learning (e.g., e-learning platforms, virtual classrooms)",
        "Inclusive Education (e.g., education for all, special needs education)",
        "Teacher Training (e.g., professional development, new teaching methods)",
        "Educational Technology (e.g., interactive learning tools, digital textbooks)" ,
        "Others"
    ],
    "Economic Empowerment" : [
        "Financial Education (e.g., budgeting, saving, investing)",
        "Start-up Innovations (e.g., new business ideas, entrepreneurship support)",
        "Vocational Training (e.g., skill development, job readiness)",
        "Retail Innovations (e.g., new products, better shopping experiences)"  ,
        "Others"
    ],
    "Smart and Resilient Communities" : [
        "Smart Cities (e.g., smart traffic systems, digital public services)",
        "Electric Vehicles (e.g., electric cars, charging stations)",
        "Disaster Management (e.g., emergency response systems, disaster-proof buildings)",
        "Robotics and Drones (e.g., automation, aerial surveys)",
        "Smart Textiles (e.g., wearable technology, smart fabrics)",
        "Travel and Tourism (e.g., eco-tourism, smart travel apps)",
        "Others"
    ],
    "Agriculture and Rural Development" : [
        "Modern Farming Techniques (e.g., hydroponics, precision farming)",
        "Rural Development (e.g., rural infrastructure, community projects)",
        "Food Security (e.g., food storage, distribution systems)",
        "Nutrition (e.g., healthy diets, fortified foods)"  ,
        "Others"
    ],
};

export const themes = [
    {   id: 1, 
        image: i1, 
        title: 'themes.sustainabletheme', 
        focusareas: [
            "sustainablefocusareas.focusarea1",
            "sustainablefocusareas.focusarea2",
           "sustainablefocusareas.focusarea3",
           "sustainablefocusareas.focusarea4",
           "sustainablefocusareas.focusarea5",
            "Others"
        ], 
        desc:  "themedetails.sustainabletheme",
    },
    { 
        id: 2, 
        image: i2, 
        title: "themes.digitaltheme", 
        focusareas: [
            "digitalfocusareas.focusarea1",
            "digitalfocusareas.focusarea2",

            "digitalfocusareas.focusarea3",

            "digitalfocusareas.focusarea4",

            "digitalfocusareas.focusarea5",

            "Others"
        ], 
        desc:  "themedetails.digitaltheme",
    },
    { 
        id: 3, 
        image: i3, 
        title:  "themes.healththeme", 
        focusareas: [
           "healthfocusareas.focusarea1",
           "healthfocusareas.focusarea2",
           "healthfocusareas.focusarea3",
           "healthfocusareas.focusarea4",
            "Others"
        ], 
        desc: "themedetails.healththeme",
    },
    { 
        id: 4, 
        image: i4, 
        title: "themes.educationtheme", 
        focusareas: [
            "educationfocusareas.focusarea1",
            "educationfocusareas.focusarea2",

            "educationfocusareas.focusarea3",

            "educationfocusareas.focusarea4",

            "Others"
        ], 
    desc: "themedetails.educationtheme",

    },
    { 
        id: 5, 
        image: i5, 
        title:  "themes.economictheme", 
        focusareas: [
            "economicfocusareas.focusarea1",
            "economicfocusareas.focusarea2",
            "economicfocusareas.focusarea3",
            "economicfocusareas.focusarea4",
            "Others"
        ], 
        desc:"themedetails.economictheme",
    },
    { 
        id: 6, 
        image: i6, 
        title: "themes.smarttheme",
        focusareas: [
            "smartfocusareas.focusarea1",
            "smartfocusareas.focusarea2",

            "smartfocusareas.focusarea3",

            "smartfocusareas.focusarea4",

            "smartfocusareas.focusarea5",

            "smartfocusareas.focusarea6",

            "Others"
        ], 
        desc:"themedetails.smarttheme",
    },
    { 
        id: 7, 
        image: i7, 
        title: "themes.agritheme",
        focusareas: [
            "agrifocusareas.focusarea1",

            "agrifocusareas.focusarea2",

            "agrifocusareas.focusarea3",
            "agrifocusareas.focusarea4",


            "Others"
        ], 
        desc:"themedetails.agritheme",
    },
    { 
        id: 8, 
        image: i8, 
        title: "themes.othertheme", 
        focusareas:  ["otherfocusareas.focusarea1"], 
        desc:"themedetails.othertheme",
    }
  ];

export const questions = [
    { qid: 1, title: 'Select a theme which relates to your idea' },
    { qid: 2, title: 'Select focus area' },
    { qid: 3, title: 'Describe your problem statement' },
    { qid: 4, title: 'Give a Title to your IDEA' },
    { qid: 5, title: 'Describe your Idea in detail' },
    { qid: 6, title: 'Share video link of your idea prototype' },
  ];

  