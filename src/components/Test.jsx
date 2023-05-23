import React, { useRef, useState } from "react";
import { GLOBALTYPES } from "../redux/actions/globalType";
import { useDispatch } from "react-redux";

const Test = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [image, setImage] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState('');


  const refCanvas = useRef();
  const videoRef = useRef()

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File dose not exit.");

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Image format is incorrect.");
      }
      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { err } });
    setImage([...image, ...newImages]);
  };

  const delateImage = (index) => {
    const newArrImg = [...image];
    newArrImg.splice(index, 1);
    setImage(newArrImg);
  };

  const handleStream = () => {
    setStream(true);
    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({video: true})
      .then((mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play()
        const tracks = mediaStream.getTracks()
        setTracks(tracks[0]);
      })
      .catch(err => console.log(err))
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth
    const height = videoRef.current.clientHeight

    refCanvas.current.setAttribute("width", width)
    refCanvas.current.setAttribute("height", height)

    const ctx = refCanvas.current.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, width, height)

    let URL = refCanvas.current.toDataURL()
    setImage([...image, {camera: URL}])
  }
  const handleStopStream = () => {
    tracks.stop()
    setStream(false)
}
  return (
    <div className="status_modal">
      <form>
        <div className="status_header">
          <h5 className="m-0">create post</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>
        <div className="status_body">
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_images">
            {image.map((img, index) => (
              <div key={index} id="file_img">
                <img
                  src={img ? img.camera : URL.createObjectURL(img)}
                  alt="images"
                  className="img-thumb"
                />
                <span onClick={() => delateImage(index)}>&times;</span>
              </div>
            ))}
          </div>
          {stream && (
            <div className="stream position-relative">
              <video src='' autoPlay muted  ref={videoRef}
                  width="100%"
                  height="100%" />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} />
              <canvas id="canvas" width="1920" height="600" data-rgb="230, 126, 34" data-bg="#000000"></canvas>
            </div>
          )}
          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture}/>
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />

                <div className="file_upload">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*"
                    onChange={handleChangeImages}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Test;
