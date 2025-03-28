
import React, { useEffect, useState } from 'react';



export default function Test() {
  const [show, setShow] = useState(false);
  let timer;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const resetTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(handleShow, 8000);
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    const eventHandler = () => resetTimer();
    events.forEach(event => window.addEventListener(event, eventHandler));

    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, eventHandler));
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className={`modal ${show ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Inactivity Detected</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <p>You have been inactive for 8 seconds!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show">
        </div>}
    </>
  );
}
