import React from 'react';
import YouTube from 'react-youtube';
import '../App.css';

const Modal = ({ show, onClose, videoUrl }) => {
  if (!show) {
    return null;
  }

  const videoId = videoUrl.split('v=')[1];

  const videoOpts = {
    height: '390',
    width: '640',
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <YouTube videoId={videoId} opts={videoOpts} />
      </div>
    </div>
  );
};

export default Modal;
