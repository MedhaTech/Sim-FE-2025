/* eslint-disable indent */

import React,{useState}from 'react';
import "./image.css";
import FilePreviewModal from './Modal';
import { encryptGlobal } from '../../constants/encryptDecrypt';
import axios from "axios";
import { getCurrentUser } from '../../helpers/Utils';

const LinkComponent = ({ item }) => {
  const currentUser = getCurrentUser("current_user");
    const [selectedFile, setSelectedFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handlePreview = async(file,fileName) => {
           const parts = file.split('/');
              const path = parts.slice(3).join('/');
              const openParam = encryptGlobal(JSON.stringify({
                filePath: path
              }));
              var config = {
                method: 'get',
                url:
                  process.env.REACT_APP_API_BASE_URL +
                  `/admins/s3fileaccess?Data=${openParam}`,
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${currentUser?.data[0]?.token}`
                }
              };
              await axios(config)
                .then(function (response) {
                  if (response.status === 200) {
                  setTimeout(() => {
                            setSelectedFile({ prototype_image: response.data.data,fileName:fileName });
                    setShowModal(true);
                          }, 500);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
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
                            style={{ cursor: 'pointer' }}
                            onClick={() => handlePreview(ans,fileName)}
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
