import React, { useEffect, useRef } from "react";



const Toast = ({ msg, handleShow, bgColor }) => {
  const color =  bgColor === 'bg-success' ? '#28a745' : '#DC3531'

  const dropdown_toggle_el = useRef(null)
  console.log(handleShow)
  useEffect(() => {
    dropdown_toggle_el.current.classList.add('active')
    const timeoutId = setTimeout(() => {
      dropdown_toggle_el.current.classList.remove('active')
    }, 5200);
    return () => clearTimeout(timeoutId);
  }, [])

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      handleShow();
    }, 6000);

    return () => clearTimeout(timeoutId);
  }, []);
  
  
  return (
    <div
      className={`toast show position-fixed text-light `}
      ref={dropdown_toggle_el}
      style={{ top: "5px", right: "5px", minWidth: "350px", zIndex: 50, borderLeft:  `6px solid ${color} ` }}
    >
      <div className="toast-content">
        <i className={`fas fs-solid fa-check check ${bgColor}`}></i>

        <div className="message">
          <span className="text text-1">{msg.title}</span>
          <span className="text text-2">{msg.body}</span>
        </div>

        <button
          className="ml-2 mb-1 close"
          data-dismiss="toast"
          style={{ outline: "none" }}
          onClick={handleShow}
        >
          &times;
        </button>
        <div className="progressclone active"></div>
      </div>
    </div>
  );
};

export default Toast;


