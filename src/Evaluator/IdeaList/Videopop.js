/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const VideoPopup = ({ videoUrl }) => {
  const [show, setShow] = useState(false);

  const getEmbedUrl = (url) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // fallback to direct URL
  };

  return (
    <>
      <a
        href="#!"
        onClick={() => setShow(true)}
        style={{ textDecoration: 'none', color: 'skyblue' }}
      >
        {videoUrl}
      </a>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Video Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          {videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) ? (
        <div className="ratio ratio-16x9">
          <iframe
            src={getEmbedUrl(videoUrl)}
            title="Video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <div className="text-danger text-center">
          <strong>Invalid or unsupported video link.</strong>
        </div>
      )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoPopup;
