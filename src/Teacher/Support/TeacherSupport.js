import React from 'react';
import { FaTools } from 'react-icons/fa';

const TeacherSupport = () => {
    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="page-header">
                    <div className="page-title">
                        <h4>Support</h4>
                    </div>
                </div>
                <div className='text-center '>
                    <FaTools 
                        size={150} 
                    /><br/><hr/>
                    <h4 >Page is under development.<br/>It will get updated soon.</h4>
                </div>
            </div>
        </div>
    );
};

export default TeacherSupport;