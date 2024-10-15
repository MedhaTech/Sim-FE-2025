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

class TCertificate extends React.Component { 
    constructor(props) { 
        super(props); 
        this.state = {}; 
    } 
    
    render() { 
        return ( 
            <div className="container-fluid bg-white"> 
                <div className="row"> 
                    <div style={{ position: 'relative' }}> 
                        <span 
                            className="text-capitalize" 
                            style={{ 
                                position: 'absolute', 
                                top: '22rem', 
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
                                top: '24.2rem', 
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
                                height: '800px',  
                                border: '1px solid #ccc' 
                            }} 
                        /> 
                    </div> 
                </div> 
            </div> 
        ); 
    } 
} 

export default TCertificate;
