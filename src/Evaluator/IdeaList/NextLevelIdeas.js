/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react';
import './IdeaList.scss';
// import Layout from '../Layout';
import { Button } from '../../stories/Button';
import { getSubmittedIdeaList } from '../store/evaluator/action';
import { useDispatch, useSelector } from 'react-redux';
import succesImg from '../../assets/img/success1.jpeg';
import NextLevel from './NextLevel';

const IdeaList = () => {
    // here we can see all the ideasList //
    const topRef = React.useRef();
    const dispatch = useDispatch();
    const [ideaDetails, setIdeaDetails] = React.useState({});
    const [isNextDiv, setIsNextDiv] = React.useState(false);

    const allIdeaList = useSelector(
        (state) => state?.evaluator.submittedIdeaList
    );

    React.useEffect(() => {
        dispatch(getSubmittedIdeaList('L2'));
    }, []);
    React.useEffect(() => {
        if (allIdeaList) {
            setIdeaDetails(allIdeaList);
        } else {
            setIdeaDetails({});
        }
    }, [allIdeaList]);
    // React.useEffect(() => {
    //     if (allIdeaList?.message === "All challenge has been accepted, no more challenge to display") {
    //         setIdeaDetails(null); // Set ideaDetails to null when no more challenges exist
    //     } else if (allIdeaList && Object.keys(allIdeaList).length > 0) {
    //         setIdeaDetails(allIdeaList); // Update ideaDetails with the fetched data
    //     } else {
    //         setIdeaDetails({}); // Default empty object when there's no data
    //     }
    // }, [allIdeaList]);
    // React.useEffect(() => {
    //     if (allIdeaList?.message === "All challenge has been accepted, no more challenge to display") {
    //         setIdeaDetails(null); 
    //     } else if (allIdeaList && Object.keys(allIdeaList).length > 0) {
    //         setIdeaDetails(allIdeaList); 
    //     } else {
    //         setIdeaDetails({}); 
    //     }
    // }, [allIdeaList]);
  
    const handleNext = () => {
        dispatch(getSubmittedIdeaList('L2'));
    };
console.log(ideaDetails.length,"IDEA");
    return (
        <div className="page-wrapper">
        <div className="content">
            <div
                className="container idea_list_wrapper pt-5 mb-50"
                ref={topRef}
            >
                <div className="row">
                    {!isNextDiv ? (
                        <div className="col-12">
                            {Object.keys(ideaDetails).length > 0 && ideaDetails !== undefined ? (
                                <NextLevel

                                    ideaDetails={ideaDetails}
                                    handleSkip={handleNext}
                                    setIsNextDiv={setIsNextDiv}
                                />
                            
                            ) : (
                                <div className="row">
                                    <div className="col-sm-6 m-auto">
                                        <div className="card p-4 text-center">
                                            <div className="success_img text-center w-100">
                                                <img src={succesImg} alt=".." />
                                                <br />
                                            </div>
                                            <h2 className="my-auto text-center my-4">
                                                All idea has been processed, no
                                                more idea to display.
                                               
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="col-sm-6 m-auto">
                            <div className="card p-4 text-center">
                                <div className="success_img text-center w-100">
                                    <img src={succesImg} alt=".." />
                                    <br />
                                </div>
                                <h2>Idea successfully processed!</h2>
                                <p>Do you want to process another Idea?</p>
                                <div className="text-center my-3">
                                    <Button
                                        btnClass="primary"
                                        size="small"
                                        label="Click Here"
                                        onClick={() => {
                                            setIsNextDiv(false);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div >
            </div >
    );
};

export default IdeaList;
