/* eslint-disable indent */
import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

const FilePreviewModal = ({teamResponse, show, onHide} ) => {
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    const url = teamResponse?.prototype_image;
    if (url) {
      const extension = url.split('.').pop().toLowerCase();
      const fileexten = extension.split('?'); 
      setFileType(fileexten[0]);
    }
  }, [teamResponse]);
const { t } = useTranslation();
  const isImage = ['jpg', 'jpeg', 'png', 'gif','JPG', 'JPEG', 'PNG', 'webp'].includes(fileType);
  //const isPDF = fileType === 'pdf';

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>File Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isImage ? (
          <img
            src={teamResponse.prototype_image}
            alt="Preview"
            style={{ width: '100%', height: '100%' }}
          />
        ) 
      //   : isPDF  ?
      //    (
        
      //   <div style={{ height: '600px' }}>
      //   <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
      //     <Viewer fileUrl={teamResponse.prototype_image} />
      //   </Worker>
         
      // </div>
      //   ) 
        : (
          <div style={{ textAlign: 'center' }}>
            <p>Preview not available. Click below to download:</p>
            <a
              href={teamResponse.prototype_image}
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <Button variant="warning">{t('ideaSubmission.download')}</Button>
            </a>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default FilePreviewModal;
