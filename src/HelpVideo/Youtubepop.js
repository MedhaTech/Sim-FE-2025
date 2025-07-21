/* eslint-disable indent */
import { Modal } from "react-bootstrap";
import YouTube from "react-youtube";

const YoutubePopup = ({ videoUrl, setShow, show }) => {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg" centered>
      <Modal.Body>
        <div className="ratio ratio-16x9">
          <YouTube videoId={videoUrl} />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default YoutubePopup;
