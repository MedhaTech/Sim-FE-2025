/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import IdeaForm from './IdeaForm';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import i1 from "../../assets/img/Themes/1.png";
import i2 from "../../assets/img/Themes/2.png";
import i3 from "../../assets/img/Themes/3.png";
import i4 from "../../assets/img/Themes/4.png";
import i5 from "../../assets/img/Themes/5.png";
import i6 from "../../assets/img/Themes/6.png";
import i7 from "../../assets/img/Themes/7.png";

const themes = [
  { id: 1, image: i1, title: 'Sustainable Development', focusareas: ["Environmental Conservation", "Renewable energy", "Sustainable Agriculture", "Water Management"], desc: "This theme emphasizes the importance of balancing economic growth with environmental protection to ensure a sustainable future for coming generations." },
  { id: 2, image: i2, title: 'Digital Transformation', focusareas: ["Digital literacy", "Access to technology", "Cybersecurity", "AI technology based"], desc: "Highlights the critical role of digital technologies in bridging the digital divide and fostering innovation, making India a leader in the digital economy." },
  { id: 3, image: i3, title: 'Health and Well-being', focusareas: ["Physical health", "mental health", "healthcare innovations", "community well-being"], desc: "Focuses on enhancing the overall health and wellness of communities, ensuring that physical and mental health are prioritized in development plans." },
  { id: 4, image: i4, title: 'Quality Education', focusareas: ["Inclusive education", "remote learning", "lifelong learning", "teacher training"], desc: "Stresses the necessity of providing equitable, high-quality education for all, fostering lifelong learning and preparing a skilled workforce for the future." },
  { id: 5, image: i5, title: 'Economic Empowerment', focusareas: ["Financial literacy", "entrepreneurship", "vocational training", "economic development"], desc: " Aims to uplift communities by promoting financial literacy, entrepreneurship, and vocational skills, driving inclusive economic growth." },
  { id: 6, image: i6, title: 'Smart and Resilient Communities', focusareas: ["Smart cities", "disaster management", "infrastructure development", "social innovation"], desc: " Encourages the development of adaptive and innovative communities capable of withstanding and thriving amid future challenges and disasters." },
  { id: 7, image: i7, title: 'Cultural Heritage and Creativity', focusareas: ["Preserving cultural heritage", "promoting arts and crafts", "fostering creativity"], desc: "Recognizes the value of preserving cultural heritage while promoting creativity and the arts as essential components of a vibrant society." },
  { id: 8, image: i2, title: 'Others', focusareas: ["Any other area that broadly qualifies for the vision of Viksit Bharat"], desc: "Encourages innovative solutions in any other area that aligns with the vision of Viksit Bharat 2047, fostering a culture of broad-based development and progress." }
];

const settings = {
  dots: false,
  autoplay: false,
  slidesToShow: 5,
  margin: 0,
  speed: 500,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 776,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 567,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const Idea = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [data, setData] = useState(0);
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedTheme && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTheme]);

  const handleDiscard = () => {
    setSelectedTheme(null);
  };

  return (
    <div className='page-wrapper'>
      <div className='content'>
        <div className="page-header">
          <div className="page-title">
            <h4>Idea Submission</h4>
            <h6>Share your Amazing Ideas with us</h6>
          </div>
        </div>
        {!selectedTheme ? (
          <div className="row align-items-start pos-wrapper pos-design">
            <div className="col-md-12 col-lg-8">
              <div className="pos-categories tabs_wrapper">
                <h5>Themes</h5>
                <p>Select your Theme Card</p>
                <Slider {...settings} className='tabs owl-carousel pos-category'>
                  {themes.map((theme) => (
                    <div id={theme.id} key={theme.id} className='pos-slick-item' onClick={() => setData(theme.id)}>
                      <Link to="#">
                        <img src={theme.image} alt={theme.title} style={{ maxWidth: "50%", maxHeight: "50%" }} />
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            {!data ? (
              <div className="col-md-12 col-lg-4 ps-0">
                <aside className="product-order-list">
                  <div className="head d-flex align-items-center justify-content-between w-100">
                    <div className="">
                      <h5>Select a Theme</h5>
                      <span>to know more</span>
                    </div>
                  </div>
                </aside>
              </div>
            ) : (
              <div className="col-md-12 col-lg-4 ps-0">
                <aside className="product-order-list">
                  <div className="head d-flex align-items-center justify-content-between w-100">
                    <div className="">
                      <h5>{themes[data - 1].title}</h5><br />
                      <span>{themes[data - 1].desc}</span>
                    </div>
                  </div>
                  <div className="product-added block-section">
                    <div className="head-text d-flex align-items-center justify-content-between">
                      <h6 className="d-flex align-items-center mb-0">
                        Focus Areas<span className="count">{themes[data - 1].focusareas.length}</span>
                      </h6>
                    </div>
                    <div className="product-wrap">
                      <div className="product-list d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center product-info">
                          <div className="info">
                            <h6>
                              <span>{themes[data - 1].focusareas[0]}</span>
                            </h6>
                            <h6>
                              <span>{themes[data - 1].focusareas[1]}</span>
                            </h6>
                            <h6>
                              <span>{themes[data - 1].focusareas[2]}</span>
                            </h6>
                            <h6>
                              <span>{themes[data - 1].focusareas[3]}</span>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="btn-row d-sm-flex align-items-center justify-content-between" onClick={() => setSelectedTheme(themes[data - 1].title)}>
                    <Link
                      to="#"
                      className="btn btn-info btn-icon flex-fill"
                    >
                      <span className="me-1 d-flex align-items-center">
                        <i data-feather="pause" className="feather-16" />
                      </span>
                      Proceed
                    </Link>
                  </div>
                </aside>
              </div>
            )}
          </div>
        ) : (
          <div ref={formRef}>
            <IdeaForm selectedTheme={selectedTheme} themes={themes} onDiscard={handleDiscard} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Idea;
