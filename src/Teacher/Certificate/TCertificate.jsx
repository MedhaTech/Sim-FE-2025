/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// /* eslint-disable indent */
// import React from 'react';
// import TeacherCertificate from "../../assets/img/Certificates/teacher.jpg";

// class TCertificate extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//     }
//     render() {

//         return (
//             <div className="container-fluid bg-white">
//                 <div className="row">
//                     <div
//                         style={{ position: 'relative' }}
//                     >
//                         <span
//                             className="text-capitalize"
//                             style={{
//                                 position: 'absolute',
//                                 top: '7.7rem',
//                                 left: '11rem',
//                                 fontSize: '0.7rem',
//                                 fontFamily: 'Times New Roman'
//                             }}
//                         >
//                             {this.props.title}{' '}
//                             {this.props.full_name}
//                         </span>
//                         <span
//                             className="text-capitalize"
//                             style={{
//                                 position: 'absolute',
//                                 top: '9rem',
//                                 left: '4.5rem',
//                                 fontSize: '0.7rem',
//                                 fontFamily: 'Times New Roman'
//                             }}
//                         >
//                             {
//                                 this.props.organization_name
//                             }
//                         </span>
//                         <img
//                             src={TeacherCertificate}
//                             alt="certificate"
//                             style={{
//                                 width: '297px',
//                                 height: '209px',
//                                 border: '1px solid #ccc'
//                             }}
//                         />
//                     </div>


//                 </div>
//             </div>
//         );
//     }
// }
// export default TCertificate;
///////////////////////////////////
/* eslint-disable no-unused-vars */ /* eslint-disable indent */ 
import React from 'react'; 
import TeacherCertificate from "../../assets/img/Certificates/TeacherApp.jpg";  
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
            <div className="container-fluid bg-white"> 
                <div className="row"> 
                    <div style={{ position: 'relative' }}> 
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
                                // border: '1px solid #ccc' 
                            }} 
                        /> 
                    </div> 
                </div> 
            </div>
    ) : (
        <h2 className='text-center' style={{color:"blue"}}>Certificates Are Coming Soon ...</h2>
    )}
            </div>  
        ); 
    } 
} 

export default TCertificate;
