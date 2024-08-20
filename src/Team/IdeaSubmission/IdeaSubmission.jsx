/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useEffect, useLayoutEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonPage from '../../components/CommonPage';
import { getCurrentUser } from '../../helpers/Utils';
import { getStudentChallengeSubmittedResponse } from '../../redux/studentRegistration/actions';
// import Layout from '../../Layout';
import IdeasPageNew from './IdeaPageCopy';
// import SDG from './SDG';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import Idea from './Idea';
const IdeaSubmission = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const language = useSelector(
        (state) => state?.studentRegistration?.studentLanguage
    );
    const challengesSubmittedResponse = useSelector(
        (state) => state?.studentRegistration.challengesSubmittedResponse
    );
    console.log(challengesSubmittedResponse,"res");
    const currentUser = getCurrentUser('current_user');
    const [showChallenges, setShowChallenges] = useState(false);
    const [showCompleted, setShowCompleted] = useState(false);
    const [view, setView] = useState(false);
    const [isideadisable, setIsideadisable] = useState(false);

    console.log(showChallenges,"11");
    useEffect(() => {
        const popParam = encryptGlobal(
            JSON.stringify({
              state:currentUser.data[0]?.state,
              role:currentUser.data[0]?.role
            })
        );
        var config = {
            method: 'get',
            url: process.env.REACT_APP_API_BASE_URL + `/popup?Data=${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${currentUser.data[0]?.token}`
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.data[0]?.on_off === '1') {
                        setIsideadisable(true);
                    } else {
                        setIsideadisable(false);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
   
    useLayoutEffect(() => {
        dispatch(
            getStudentChallengeSubmittedResponse(
                currentUser?.data[0]?.team_id,
                language
            )
        );
    }, [dispatch, language, currentUser?.data[0]?.team_id]);
    useLayoutEffect(() => {
        if (challengesSubmittedResponse && challengesSubmittedResponse.length > 0) {
            challengesSubmittedResponse[0].status === 'DRAFT'
                ? setShowChallenges(true)
                : view
                ? setShowChallenges(true)
                : setShowCompleted(true);
        } else {
            setShowChallenges(false);
        }
    }, [challengesSubmittedResponse, view]);
    const commonPageText = t('student.idea_submitted_desc');
    const handleView = () => {
        // here we can see the idea submission //
        setShowChallenges(true);
        setShowCompleted(false);
        setView(true);
    };
    return showCompleted ? (
        <div>
            <CommonPage
                text={commonPageText}
                showButton={true}
                showChallenges={handleView}
            />
        </div>
    ) : showChallenges ? (
        <IdeasPageNew/>
    ) : isideadisable ? (
        // <SDG setShowChallenges={setShowChallenges} />
        <Idea/>
    ) : (
        <div>
            <CommonPage
                text={t('student_course.idea_submission_date_com_desc')}
                ideaSubmissionComButton={true}
            />
        </div>
    );
};
export default IdeaSubmission;
