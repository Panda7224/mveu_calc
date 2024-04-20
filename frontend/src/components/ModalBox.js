import React from 'react';
import './ModalBox.css';

function ModalBox({setModalBox, children}) {
  return (
    <>
      <div className='echo' onClick={() => setModalBox('none')}></div>
      <div className="ModalBox">
        { children }
        <button className='close' onClick={() => setModalBox('none')}>закрыть</button>
      </div>
    </>
  );
}

export default ModalBox;