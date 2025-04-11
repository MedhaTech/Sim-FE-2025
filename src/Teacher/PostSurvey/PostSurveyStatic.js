/* eslint-disable indent */
import { Fragment } from 'react';
import Congo from '../../assets/img/survey1.png';
import "./tepostyle.scss";
import { useTranslation } from "react-i18next";

const PostSurveyStatic = () => {
     const { t } = useTranslation();
    return (
        <Fragment>
            <div className="text-center">
                <div>
                    <img className="img-fluid imgSize" src={Congo}></img>
                </div>
                <div>
                    <h4 className="common-flex">
                    {t('teacherJourney.t3')}
                    </h4>
                    <h4 className="common-flex">
                    {t('teacherJourney.t4')}
                    </h4>
                </div>
            </div>
        </Fragment>
    );
};

export default PostSurveyStatic;
