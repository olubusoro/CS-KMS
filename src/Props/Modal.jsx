import React from 'react';
import {FaTimes} from "react-icons/fa";

const Modal = ({isOpen, onClose, children}) => {

    if(!isOpen) return null

  return (
    <div className="fixed inset-0 z-50   backdrop-blur-[2px] flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-h-[90vh] overflow-y-auto max-w-2xl p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
