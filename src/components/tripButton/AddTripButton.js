import React from 'react';
import './popup.css'

function AddTripButton(props) {
  return (props.trigger) ? (
    <div className='popup'> 
      <div className='popup_inner'>
        <div className='popup-content'>
          <p> Something </p>
        </div>
        <button className='close-btn' onClick={() => props.setTrigger(false)}> close </button>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default AddTripButton;
