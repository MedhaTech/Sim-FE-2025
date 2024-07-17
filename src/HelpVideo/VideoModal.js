import React from 'react';
//import { Link } from 'react-router-dom';

//import Vimeo from '@u-wave/react-vimeo';

const VideoModal = ({ v, setShow }) => {
    console.log("In VideoModal",v);
    const handleClose = () => setShow(false);
    return (
        <div>
            {/* Add Role */}
            <div className="modal fade" id="add-units" onClick={handleClose} >
                <div className="modal-dialog modal-dialog-centered custom-modal-two modal-lg">
                    <div className="modal-content">
                        <div className="page-wrapper-new p-0">
                            <div className="content">
                                {/* <div className="modal-header border-0 custom-modal-header">
                                    {/* <div className="page-title">
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
                                </div> */}
                                <div className="modal-body custom-modal-body">
                                    <div style={{ width: '100%', height: '400px' }}>
                                        <iframe src={v}
                                            title="YouTube video player" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
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
