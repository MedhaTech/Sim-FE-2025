/* eslint-disable no-unused-vars */
/* eslint-disable indent */
// /* eslint-disable indent */
// import React from 'react';
// import "./image.css";
// const LinkComponent = ({item}) => {
//     return (
//         <>
//             {item &&
//                 item.length > 0 &&
//                 item.map((ans, i) => {
//                     let a_link = ans.split('/');
//                     let count = a_link.length - 1;
//                     return (
//                         <a
//                             key={i}
//                             className="badge link-badge mb-2 bg-info p-3 ms-3"
//                             href={ans}
//                             target="_blank"
//                             rel="noreferrer"
//                         >
//                             {a_link[count]}
//                         </a>
//                     );
//                 })}
//         </>
//     );
// };

// export default LinkComponent;
import React,{useState}from 'react';
import "./image.css";
import FilePreviewModal from './Modal';
const LinkComponent = ({ item }) => {
    const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handlePreview = (url) => {
    setSelectedFile({ prototype_image: url });
    setShowModal(true);
  };

  
    return (
        <>
            {item &&
                item.length > 0 &&
                item.map((ans, i) => {
                    let a_link = ans.split('/');
                    let count = a_link.length - 1;
                    let fileName = a_link[count];
                    return (
                        <a
                            key={i}
                            className="badge link-badge mb-2 bg-info p-3 ms-3"
                            // href={ans}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePreview(ans)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            
                          
                             <span className="file-name">
                                {fileName}
                            </span>
                           

                        </a>
                    );
                })}
                {selectedFile && (
        <FilePreviewModal
          show={showModal}
          onHide={() => setShowModal(false)}
          teamResponse={selectedFile}
        />
      )}
        </>
    );
};

export default LinkComponent;
