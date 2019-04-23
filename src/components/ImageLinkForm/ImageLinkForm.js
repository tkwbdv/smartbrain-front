
import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3 white-80">
        {"This Magic brain will detect faces in your pictures. Give it a try!"}
      </p>
      <div className="w-80 center form pa4 br3 shadow-5">
        <input className="f4 pa2" type="text" onChange={onInputChange} />
        <button className="f4 grow ph3 pv2 washed-red bg-blue ba b--washed-blue pointer" onClick={onPictureSubmit}>Detect</button>
      </div>
    </div>
  );
}

export default ImageLinkForm;