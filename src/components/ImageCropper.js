import { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./forms/ImageCropper.css"
function ImageCropper() {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);

  const selectImage = (file) => {
    setSrc(URL.createObjectURL(file));
  };

  const cropImageNow = () => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Converting to base64
    const base64Image = canvas.toDataURL("image/jpeg");
    setOutput(base64Image);
    // setSrc(null);
  };
 
  return (
    <div className="col-6 my-0">
      <div className="row">
        <label htmlFor="datepicker" className="form-label">
          Choose an Image
        </label>
        <div className="col-6">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              selectImage(e.target.files[0]);
            }}
          />

          <div className="row">
            <div div className="col-8">
              {src && (
                <div className="croppedImg">
                  <ReactCrop
                    src={src}
                    onImageLoaded={setImage}
                    crop={crop}
                    onChange={setCrop}
                  />
                  <br />
                  <button className="btn btn-danger" onClick={cropImageNow}>
                    Crop
                  </button>
                </div>
              )}
            </div>
            <div className="col-3">{output && <img src={output} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
