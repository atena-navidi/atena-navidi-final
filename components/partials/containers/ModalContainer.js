import React from "react";

function ModalContainer({ children, isOpen, setIsOpen }) {
  if (!isOpen) return;
  return (
    <div className="fixed w-full h-full top-0 right-0 bg-black opacity-20 z-10">
      <div className="w-full h-full flex justify-center items-center">
        <div className="min-w-24 min-h-24 ">{children}</div>
      </div>
      
    </div>
  );
}

export default ModalContainer;
