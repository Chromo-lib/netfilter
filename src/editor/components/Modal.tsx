import React from 'react';
import IconClose from '../icons/IconClose';

export default function Modal({ children, showModal, setShowModal }) {
  return (<div className={"w-100 modal flex-column justify-center align-center blur " + (showModal ? 'd-flex' : 'd-none')}>
    <button className="btn btn-close-modal bg-white"
      onClick={() => { setShowModal(false) }}><IconClose /></button>
    <div className="bg-dark modal-content br7 shadow scale overflow">{children}</div>
  </div>);
}