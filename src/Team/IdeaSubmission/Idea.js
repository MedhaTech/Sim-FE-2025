/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import IdeaForm from './IdeaForm';
import { Link } from 'react-router-dom';
import ImageWithBasePath from '../../core/img/imagewithbasebath';
import { Check } from 'react-feather';
import FeatherIcon from "feather-icons-react";
import {themes}  from "./themesData";


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
                <div className="pos-products">
                    <div className="tabs_container">
                        <div className="tab_content active">
                            <div className="row">
                            {themes.map((theme) => (
                                <div id={theme.id} key={theme.id} className="col-sm-2 col-md-6 col-lg-3 col-xl-3 pe-2" onClick={() => setData(theme.id)}>
                                    <div className="product-info default-cover card">
                                        <Link to="#" className="img-bg">
                                            <img
                                            src={theme.image}
                                            alt={theme.id}
                                            />
                                            <span>
                                        
                                            <Check className="feather-16"/>
                                            </span>
                                        </Link>
                                        {/* <h6 className="cat-name">
                                            <Link to="#">Mobiles</Link>
                                        </h6> */}
                                        <h6 className="product-name">
                                            <Link to="#">{theme.title}</Link>
                                        </h6>
                                        <div className="d-flex align-items-center justify-content-between price">
                                            <span>Focus Areas</span>
                                            {theme.id === 8? (<p><FeatherIcon size={20} icon="loader" /></p>):(<p>{theme.focusareas.length -1}</p>)}
                                            
                                        </div>
                                    </div>
                                </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
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
                        Focus Areas<span className="count">{themes[data - 1].id === 8? (<p><FeatherIcon size={20} icon="loader" /></p>):(<p>{themes[data - 1].focusareas.length -1}</p>)}</span>
                      </h6>
                    </div>
                    <div className="product-wrap">
                      <div className="product-list d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center product-info">
                          <div className="info">
                            {themes[data - 1].focusareas.slice(0, themes[data - 1].focusareas.length - 1).map((focusarea, index) => (
                              <h6 key={index}>
                                <span>{focusarea}</span>
                              </h6>
                            ))}
                            {/* {themes[data - 1].focusareas.length} to display others also
                              {themes[data - 1].focusareas.map((focusarea, index) => (
                                <h6 key={index}>
                                  <span>{focusarea}</span>
                                </h6>
                              ))} */}
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
