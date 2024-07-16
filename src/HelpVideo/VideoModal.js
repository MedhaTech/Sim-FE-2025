import React from 'react';
//import { Link } from 'react-router-dom';

//import Vimeo from '@u-wave/react-vimeo';

const VideoModal = ({ v, setShow , name }) => {
    console.log("In VideoModal",v);
    const handleClose = () => setShow(false);
    return (
        <div>
            {/* Add Role */}
            <div className="modal fade" id="add-units">
                <div className="modal-dialog modal-dialog-centered custom-modal-two modal-lg">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                <div className="modal-header border-0 custom-modal-header">
                                    <div className="page-title">
                                        <h4>{name}</h4>
                                    </div>
                                    <button
                                        type="button"
                                        className="close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={handleClose}
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body custom-modal-body">
                                    <div style={{ width: '100%', height: '400px' }}>
                                        <iframe src="https://www.youtube.com/embed/CiYa_iLdpXo?si=8t7wj1idLOrW4se0" 
                                            title="YouTube video player" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                            referrerPolicy="strict-origin-when-cross-origin" 
                                            allowfullscreen
                                            
                                        ></iframe>
                                    </div>
                                        
                                    {/* <Vimeo video={v} className="video-player" /> */}
                                    <div className="modal-footer-btn">
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Add Role */}
        </div>
    );
};

export default VideoModal;
