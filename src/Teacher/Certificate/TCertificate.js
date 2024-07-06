/* eslint-disable indent */
import { useLayoutEffect, useRef, useState } from 'react';
import jsPDF from 'jspdf';
import { getCurrentUser, getNormalHeaders } from '../../helpers/Utils';
import TeacherCertificate from "../../assets/img/Certificates/teacher.jpg";
//import { useTranslation } from 'react-i18next';
import { KEY, URL } from '../../constants/defaultValues';
import axios from 'axios';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import { GiAchievement } from 'react-icons/gi';

const TCertificate = () => {
    //const { t } = useTranslation();
    const pdfRef = useRef(null);
    const currentUser = getCurrentUser('current_user');
    const [postSurveyStatus, setPostSurveyStatus] = useState('');
    let tempVar = postSurveyStatus === 'COMPLETED';
    // let tempVar = true;
    const handleCertificateDownload = () => {
        // here we can download the certificates //
        const content = pdfRef.current;
        const doc = new jsPDF('l', 'px', [211, 298]);
        doc.html(content, {
            callback: function (doc) {
                doc.save('certificate.pdf');
            }
        });
    };

    useLayoutEffect(() => {
        let axiosConfig = getNormalHeaders(KEY.User_API_Key);
        const reParam = encryptGlobal(JSON.stringify({
            role: 'MENTOR',
            locale: 'en'
        }));
        axiosConfig['params'] = {
           Data : reParam
        };
        axios
            .get(`${URL.getPostSurveyList}`, axiosConfig)
            .then((postSurveyRes) => {
                if (postSurveyRes?.status == 200) {
                    setPostSurveyStatus(
                        postSurveyRes.data.data[0].dataValues[1].progress
                    );
                }
            })
            .catch((err) => {
                return err.response;
            });
    }, []);
    return (
        <>
            {tempVar ? (
                <>
                    <div style={{display:"none"}}>
                        <div
                            ref={pdfRef}
                            style={{ position: 'relative'}}
                        >
                            <span
                                className="text-capitalize"
                                style={{
                                    position: 'absolute',
                                    top: '7.7rem',
                                    left: '11rem',
                                    fontSize: '0.7rem',
                                    fontFamily: 'Times New Roman'
                                }}
                            >
                                {currentUser?.data[0]?.title}{' '}
                                {currentUser?.data[0]?.full_name}
                            </span>
                            <span
                                className="text-capitalize"
                                style={{
                                    position: 'absolute',
                                    top: '9rem',
                                    left: '4.5rem',
                                    fontSize: '0.7rem',
                                    fontFamily: 'Times New Roman'
                                }}
                            >
                                {
                                    currentUser?.data[0]
                                        ?.organization_name
                                }
                            </span>
                            <img
                                src={TeacherCertificate}
                                alt="certificate"
                                style={{
                                    width: '297px',
                                    height: '209px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>
                    </div>
                    <div className="dash-count das1">
                        <div className="dash-counts">
                            <h4>Congrats</h4>
                            <h5>Get your Certificate</h5>
                        </div>
                        <div className="dash-imgs" onClick={handleCertificateDownload} >
                            <GiAchievement size={30} />
                        </div>
                    </div>
                    {/* <div className="text-right">
                        <Button
                            button="submit"
                            label={t(
                                'teacher_certificate.download'
                            )}
                            btnClass="primary mt-4"
                            size="small"
                            style={{ marginRight: '2rem' }}
                            onClick={handleCertificateDownload}
                        />
                    </div> */}
                </>
                ) : (
                    <div className="dash-count das1">
                        <div className="dash-counts">
                            <h4>Certificate</h4>
                            <h5>Not enabled</h5>
                        </div>
                        <div className="dash-imgs">
                            <GiAchievement size={30} />
                        </div>
                    </div>
                )}
        </>

        ////////////////////My code //////////////
        // <div className="dash-count das1">
        //     <div className="dash-counts">
        //         <h4>Certificate</h4>
        //         <h5>yet to enable</h5>
        //     </div>
        //     <div className="dash-imgs">
        //         <GiAchievement size={30} />
        //     </div>
        // </div>
    );
};

export default TCertificate;