/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import YouTube from "react-youtube";

const VideoPopup = ({ videoUrl }) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div onClick={() => setShow(true)} style={{ color: "skyblue" }}>
        {videoUrl}
      </div>

      <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Video Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="ratio ratio-16x9">
            <YouTube videoId={videoUrl} />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default VideoPopup;
