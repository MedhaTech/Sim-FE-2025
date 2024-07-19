/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight } from "react-feather";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const IdeaForm = ({ selectedTheme, themes, onDiscard }) => {
  const [formData, setFormData] = useState({
    theme: selectedTheme,
    focusArea: '',
    problemStatement: '',
    ideaTitle: '',
    ideaDescription: '',
    prototypeLink: ''
  });

  const questions = [
    { qid: 1, title: 'Select a theme which relates to your idea' },
    { qid: 2, title: 'Select focus area' },
    { qid: 3, title: 'Describe your problem statement' },
    { qid: 4, title: 'Give a Title to your IDEA' },
    { qid: 5, title: 'Describe your Idea in detail' },
    { qid: 6, title: 'Share video link of your idea prototype' },
  ];

  const [step, setStep] = useState(1);
  const formEndRef = useRef(null);
  const MySwal = withReactContent(Swal);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDiscard = () => {
    setFormData({
      theme: selectedTheme,
      focusArea: '',
      problemStatement: '',
      ideaTitle: '',
      ideaDescription: '',
      prototypeLink: ''
    });
    setStep(1);
    onDiscard();
  };

  const handleButtonClick = (position) => {
    console.log(formData);
    displayAlert(position);
    };

    const displayAlert = (position) => {
        MySwal.fire({
            text: `Your work has been saved`,
            position: position,
            showConfirmButton: false, // Hide the "OK" button

        });
    };

  useEffect(() => {
    if (formEndRef.current) {
      formEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [step]);

  const renderQuestion = (currentStep) => {
    switch (currentStep) {
      case 1:
        return (
          <li key={currentStep}>
            <div className="timeline-badge success">
              <i className="fas fa-user" />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[0].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p>{questions[0].title}</p><br />
                <select name="theme" value={formData.theme} onChange={handleInputChange} className='form-select'>
                  {themes.map((theme) => (
                    <option key={theme.id} value={theme.title}>{theme.title}</option>
                  ))}
                </select>
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      >
                        Next{" "}<ArrowRight className="me-2" />
                      </a>
                    </div>
                  </>)}
              </div>
            </div>
          </li>
        );
      case 2:
        return (
          <li className="timeline-inverted" key={currentStep}>
            <div className="timeline-badge warning">
              <i className="fas fa-users" />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[1].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p> {questions[1].title} </p><br />
                <div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type="radio" name="focusArea" value="Area 1" onChange={handleInputChange} className='form-check-input' /> Area 1
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type="radio" name="focusArea" value="Area 2" onChange={handleInputChange} className='form-check-input' /> Area 2
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type="radio" name="focusArea" value="Area 3" onChange={handleInputChange} className='form-check-input' /> Area 3
                    </label>
                  </div>
                  <div className='form-check'>
                    <label className='form-check-label'>
                      <input type="radio" name="focusArea" value="Area 4" onChange={handleInputChange} className='form-check-input' /> Area 4
                    </label>
                  </div>
                </div>
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      >
                        <ArrowLeft className="me-2" />
                        {" "}Next
                      </a>
                    </div>
                  </>)}
              </div>

            </div>
          </li>
        );
      case 3:
        return (
          <li key={currentStep}>
            <div className="timeline-badge danger">
              <i className="fas fa-gift" />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[2].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p>{questions[2].title}</p><br />
                <textarea
                  name="problemStatement"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                  className="text-form form-control"
                  placeholder="Enter Your Problem Statement"
                  rows={4} >
                </textarea>
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      >
                        Next{" "}<ArrowRight className="me-2" />
                      </a>
                    </div>
                  </>)}
              </div>
            </div>
          </li>
        );
      case 4:
        return (
          <li className="timeline-inverted" key={currentStep}>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[3].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p>{questions[3].title}</p><br />
                <textarea
                  name="ideaTitle"
                  value={formData.ideaTitle}
                  onChange={handleInputChange}
                  className="text-form form-control"
                  placeholder="Enter your Idea Title"
                  rows={2} >
                </textarea>
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      ><ArrowLeft className="me-2" />
                        {" "}Next
                      </a>
                    </div>
                  </>)}
              </div>
            </div>
          </li>
        );
      case 5:
        return (
          <li key={currentStep}>
            <div className="timeline-badge info">
              <i className="fa fa-save" />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[4].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p>{questions[4].title}</p><br />
                <textarea
                  name="ideaDescription"
                  value={formData.ideaDescription}
                  onChange={handleInputChange}
                  className="text-form form-control"
                  placeholder="Enter Idea details"
                  rows={6}>
                </textarea>
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      >
                        Next{" "}<ArrowRight className="me-2" />
                      </a>
                    </div>
                  </>)}
              </div>
            </div>
          </li>
        );
      case 6:
        return (
          <li className="timeline-inverted" key={currentStep}>
            <div className="timeline-badge success">
              <i className="fa fa-graduation-cap" />
            </div>
            <div className="timeline-panel">
              <div className="timeline-heading">
                <h4 className="timeline-title">Question {questions[5].qid}</h4>
              </div><br />
              <div className="timeline-body">
                <p>{questions[5].title}</p><br />
                <input type="text"
                  name="prototypeLink"
                  value={formData.prototypeLink}
                  onChange={handleInputChange}
                  className="text-form form-control"
                  placeholder="Provide Prototype Video Link" />
                {currentStep === step && (
                  <><br />
                    <div className='view-btn'>
                      <a
                        href="#"
                        className="btn btn-soft-info rounded-pill"
                        onClick={handleNext}
                      >
                        <ArrowLeft className="me-2" />
                        {" "}Next
                      </a>
                    </div>
                  </>)}
              </div>
            </div>
          </li>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-wrapper cardhead">
      <div className="content">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">Idea Submission</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Ribbon */}
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                {Array.from({ length: step }, (_, index) => (
                  <ul className="timeline" key={index}>
                    {renderQuestion(index + 1)}
                  </ul>
                ))}
                <div ref={formEndRef}></div>
              </div>
              {step === 7 ? (
                <div className='card-footer '>
                  <div className="col-lg-12">
                    <div className="view-btn">
                      <button type="button" className="btn btn-reset me-2" onClick={handleDiscard}>Discard</button>
                      {" "}<button id="discard" type="submit" className="btn btn-save" onClick={() => handleButtonClick('bottom-start')}>Save as Draft</button>
                    </div>
                  </div>
                </div>) : null}

            </div>
          </div>
          {/* /Ribbon */}
        </div>
      </div>
    </div>
  );
};

export default IdeaForm;
