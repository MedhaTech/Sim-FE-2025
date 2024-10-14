import { Fragment } from 'react';
import Congo from '../../assets/img/survey1.png';
import "./tepostyle.scss";

const PostSurveyStatic = () => {
    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img className="img-fluid imgSize" src={Congo}></img>
                </div>
                <div>
                    <h4 className="common-flex">
                    Please ensure Submitted Ideas by all student teams are Approved for your post survey to enable.
                    </h4>
                    <h4 className="common-flex">
                        Certificate will be generated once you complete the post
                        survey.
                    </h4>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
