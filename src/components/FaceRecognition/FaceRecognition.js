import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imgUrl, box }) => {
  const boxPosition = box.map((box, index) => {
    return <div
      className="bounding-box absolute"
      style={box}
      key={index}>
    </div>;
  })

  if (imgUrl) {
    return (
      <div className="w-80 center mt3 relative container">
        <img id="inputImage" className="ba bw2 white" src={imgUrl} alt="is the URL valid?" width="100%" height="auto" />
        {boxPosition}
      </div>
    )
  }

  return (
    <div>

    </div>
  )

}

export default FaceRecognition;