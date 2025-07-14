/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";

const FullScreenButton = ({fullScreen,setFullScreen}) => {
    return (
        <div className="d-flex justify-content-end">
            <li className="nav-item nav-item-box">
                <Link
                to="#"
                id="btnFullscreen"
                onClick={() => {
                    if (fullScreen.isFullSCreen) {
                        setFullScreen({
                            isFullSCreen: false,
                            width: ''
                        });
                    } else {
                        setFullScreen({
                            isFullSCreen: true,
                            width: '100%'
                        });
                    }
                }}
                
                >
                {
                    fullScreen.isFullSCreen ? <FeatherIcon icon="minimize" /> : <FeatherIcon icon="maximize" />
                }
                </Link>
                

            </li>
        </div>
    );
};

export default FullScreenButton;
