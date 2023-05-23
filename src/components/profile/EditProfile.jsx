import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {checkImage } from "../../utils/imageUpload"
import { GLOBALTYPES } from "../../redux/actions/globalType"
import { updateProfileUser } from "../../redux/actions/profileAction";

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);
 const dispatch = useDispatch()

 useEffect(() => {
   setUserData(auth.user)
 
 }, [auth.user])
 
  const changeAvatar = (e) => {
    const file = e.target.files[0]
    const err = checkImage(file)
    if (err) return dispatch({type: GLOBALTYPES.ALERT, payload: {error: err}})
    setAvatar(file)
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(avatar)
    dispatch(updateProfileUser({userData, avatar, auth}))
  }
  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Fullname</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="position-absolute text-danger"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            className="form-control"
            onChange={handleInput}
            value={mobile}
            name="mobile"
            type="number"
            id="mobile"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            className="form-control"
            onChange={handleInput}
            value={address}
            name="address"
            type="text"
            id="address"
          />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            className="form-control"
            onChange={handleInput}
            value={website}
            name="website"
            type="text"
            id="website"
          />
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <textarea
            className="form-control"
            onChange={handleInput}
            value={story}
            name="story"
            cols="30"
            rows="4"
            id="story"
          />
          <small className="d-block text-right text-danger">{story.length}/200</small>
          </div>

          <label htmlFor="gender">Gender</label>
          <div className="input-group-prepend px-0 mb-4">
            <select name="gender" id="gender" value={gender} className="custom-select text-capitalize" onChange={handleInput}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <button className="btn btn-info w-100" type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditProfile;
