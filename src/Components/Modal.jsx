import React from 'react';

const Modal = ({isOpen, onClose, children}) => {

    if(!isOpen) return null

  return (
    <div className='fixed inset-0 z-50  bg-opacity-40 backdrop-blur-[2px] flex items-center justify-center'>
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
              <button className="absolute top-4 right-4 text-gray-600 hover:text-red-500" onClick={onClose}>
              ✖
              </button>
              {children}
        </div>
    </div>
  );
}

export default Modal;
