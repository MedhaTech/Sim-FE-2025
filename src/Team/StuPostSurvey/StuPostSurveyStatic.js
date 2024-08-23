import { Fragment } from 'react';
import Congo from '../../assets/img/survey1.png';

const PostSurveyStatic = () => {
    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img className="img-fluid imgSize" src={Congo}></img>
                </div>
                <div>
                    <h4 className="common-flex">
                        Please ensure your team submited the idea to
                        fill the post survey.
                    </h4>
                    <p className="common-flex">
                        Certificate will be generated once you complete the post
                        survey.
                    </p>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
