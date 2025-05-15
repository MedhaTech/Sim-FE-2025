/* eslint-disable indent */

import React from 'react'; 
import TeacherCertificate from "../../assets/img/Certificates/TeacherApp.jpg";
import TnTeacherCertificate from "../../assets/img/Certificates/TecTnFinalCertificate.jpg";  

import { getCurrentUser } from "../../helpers/Utils";

class TCertificate extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = {}; 
        const currentUser = getCurrentUser("current_user");
        this.stateSpecific = currentUser?.data[0]?.state;
    } 
    render() { 
        return (
            <div>
               {this.stateSpecific !== "Tamil Nadu" ? ( 
            <div style={{ width: '100%', margin: 0, padding: 0 , overflow: 'hidden',}}> 
                <div className="row"> 
                    <div > 
                        <span 
                            className="text-capitalize" 
                            style={{ 
                                position: 'absolute', 
                                top: '31rem', 
                                left: '10rem',
                                fontSize: '1.2rem',
                                fontFamily: 'Times New Roman' 
                            }} 
                        > 
                            {this.props.title}{' '} 
                            {this.props.full_name} 
                        </span> 
                        <span 
                            className="text-capitalize" 
                            style={{ 
                                position: 'absolute', 
                                top: '34rem', 
                                left: '11rem', 
                                fontSize: '1.2rem', 
                                fontFamily: 'Times New Roman' 
                            }} 
                        > 
                            {this.props.organization_name} 
                        </span> 
                       
                        <img 
                            src={TeacherCertificate} 
                            alt="certificate" 
                            style={{ 
                                width: '1000px',  
                                height: '1110px',  
                            }} 
                        /> 
                    </div> 
                </div> 
            </div>
    ) : (
        <>
        <div  style={{ width: '100%', margin: 0, padding: 0 , overflow: 'hidden',}}>
                            <div className="row">
                                <div >
                                    <span
                                        className="text-capitalize"
                                        style={{
                                            position: 'absolute',
                                            top: '28rem',
                                            left: '14rem',
                                            fontSize: '1.2rem',
                                            fontFamily: 'Times New Roman'
                                        }}
                                    >
                                        {this.props.title}{' '}
                                        {this.props.full_name}
                                    </span>
                                    <span
                                        className="text-capitalize"
                                        style={{
                                            position: 'absolute',
                                            top: '30rem',
                                            left: '17rem',
                                            fontSize: '1.2rem',
                                            fontFamily: 'Times New Roman'
                                        }}
                                    >
                                        {this.props.organization_name}
                                    </span>
                                    <span 
                            className="text-capitalize" 
                            style={{ 
                                position: 'absolute', 
                                top: '58rem', 
                                left: '41rem', 
                                fontSize: '10px', 
                                fontWeight:"bold",
                                fontFamily: 'Times New Roman' 
                            }} 
                        > 
                            {new Date().toLocaleDateString('en-GB')} 
                        </span>
                                    <img
                                        src={TnTeacherCertificate}
                                        alt="certificate"
                                        style={{
                                            width: '1000px',
                                            height: '1110px',
                                        }} />
                                </div>
                            </div>
                        </div></>
    )}
            </div>  
        ); 
    } 
} 

export default TCertificate;
