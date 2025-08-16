import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='container mt2'> {/* Use the new container class */}
        <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto'/>
        {/* The bounding box is positioned relative to the container */}
        <div className='bounding-box' style={{top: box.top, left: box.left, width: box.width, height: box.height}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;