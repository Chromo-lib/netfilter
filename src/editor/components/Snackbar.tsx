import React from 'react';
import '../styles/Snackbar.css';

export default function Snackbar({ text, setMessage }) {

  const onClose = () => {
    setMessage(null)
  }

  if (text) {
    return <div className='w-100 snackbar justify-center show'>
      <div className='d-flex align-center br7 shadow p-1 bg-blue'>
        <div className='w-100 text-center capitalize mr-3'>{text}</div>
        <button className='red lead cp p-0 border-0 bg-blue' onClick={onClose}>X</button>
      </div>
    </div>
  }
  else return <></>
}