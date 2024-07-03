import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import play from "../assets/img/playicon.png";
import './VideoModalStyle.scss';
import { getCurrentUser } from '../helpers/Utils';
import { encryptGlobal } from '../constants/encryptDecrypt';
import Vimeo from '@u-wave/react-vimeo';



const VideoModal = ({ videoId }) => {
    const [show, setShow] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const currentUser = getCurrentUser('current_user');

    const handleMouseEnter = () => {
        setIsTooltipVisible(true);
    };
    
    const handleMouseLeave = () => {
        setIsTooltipVisible(false);
    };

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        const popParam = encryptGlobal(videoId);
        const config = {
            method: 'get',
            url: `${process.env.REACT_APP_API_BASE_URL}/videos/${popParam}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.data[0]?.token}`
            }
        };

        try {
            const response = await axios(config);
            if (response.status === 200) {
                setVideoUrl(response.data?.data[0]?.video_stream_id || '');
                setShow(true);
            }
        } catch (error) {
            console.error('Error fetching video URL:', error);
        }
    };
    
    return (
        <>
            <div className='icon-container'>
                <img src={play} className="icon" alt="play" 
                    style={{verticalAlign:"middle" , width: "60%" }} 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseLeave}
                    onClick={handleShow} /> 
                {isTooltipVisible && (
                    <div className="tooltip">
                        Watch Demo
                    </div>
                )}
            </div>

            {show && (
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Video</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {videoId && (
                            <Vimeo video={videoUrl} className="video-player" />
                        )}
                    </Modal.Body>
                </Modal>
            )}
            

            
        
        </>
    );
};

export default VideoModal;
