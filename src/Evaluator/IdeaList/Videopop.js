/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import YouTube from "react-youtube";


const getYoutubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      if (parsedUrl.pathname === "/watch") {
        return parsedUrl.searchParams.get("v");
      }
      if (parsedUrl.pathname.startsWith("/embed/") || parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/")[2];
      }
    }
  } catch (e) {
    return null;
  }
};

const VideoPopup = ({ videoUrl }) => {
  const [show, setShow] = useState(false);
   const videoId = getYoutubeVideoId(videoUrl);
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
            {videoId ? (
              <YouTube videoId={videoId} />
            ) : (
              <p>Invalid YouTube URL</p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}; 

export default VideoPopup;
