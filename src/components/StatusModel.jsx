import React, { useEffect, useRef, useState } from "react";
import { GLOBALTYPES } from "../redux/actions/globalType";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../redux/actions/postAction";

const StatusModel = () => {
  const { auth, theme, status } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setcontent] = useState("");
  const [images, setImages] = useState([]);
  const [stream, setStream] = useState(false);
  const [tracks, setTracks] = useState("");
  const videoRef = useRef();
  const refCanvas = useRef();

  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImages = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exit.");

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Image format is incorrect.");
      }
      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { err } });
    setImages([...images, ...newImages]);
  };
  const han = (e) => {
    if (e.target !== e.currentTarget) {
      return false;
    }

    e.nativeEvent.stopImmediatePropagation();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };
  const deleteImage = (index) => {
    const newArrImg = [...images];
    newArrImg.splice(index, 1);
    setImages(newArrImg);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTracks(track[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    refCanvas.current.setAttribute("width", width);
    refCanvas.current.setAttribute("height", height);

    const ctx = refCanvas.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);

    let URL = refCanvas.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
     if (tracks) tracks.stop();
    setStream(false);
  };

  useEffect(() => {
    if (status.onEdit) {
      setcontent(status.content);
      setImages(status.images);
    }
  }, [status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please add your images!" },
      });

    if (status.onEdit){
      dispatch(updatePost({ content, images, auth , status}));
    } else {
      dispatch(createPost({ content, images, auth }));
    }

    setcontent("");
    setImages([]);
    if (tracks) tracks.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

   
  return (
    <div className="status_modal" onClick={(e) => han(e)} id="status_modal">
      <form onSubmit={handleSubmit} className="form">
        <div className="status_header">
          {status.onEdit ? (
            <h5 className="m-0">Edit Post</h5>
          ) : (
            <h5 className="m-0">Create Post</h5>
          )}
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
            placeholder={`${auth.user.username}, what are you thinking?`}
            onChange={(e) => setcontent(e.target.value)}
          />
          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                <img
                  src={
                    img.camera
                      ? img.camera
                      : img.url
                      ? img.url
                      : URL.createObjectURL(img)
                  }
                  alt="images"
                  className="img-thumb"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
                <span onClick={() => deleteImage(index)}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                src=""
                autoPlay
                muted
                style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                ref={videoRef}
                width="100%"
                height="100%"
              />
              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={refCanvas} style={{ display: "none" }} />
            </div>
          )}
          <div className="input_images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleStream} />

                <div className="file_upload">
                  <i className="fas fa-image" onClick={handleStream} />
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

        <div className="status_footer">
          <button className="btn btn-secondary w-100">Post</button>
        </div>
      </form>
    </div>
  );
};

export default StatusModel;
