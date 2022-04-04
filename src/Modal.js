import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, toggleModal }) => {
  const elRef = useRef(null);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.onclick = (e) => {
      e.stopPropagation();
      console.log(e);
    };
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);
    modalRoot.onclick = toggleModal;

    return () => {
      modalRoot.removeChild(elRef.current);
      modalRoot.onclick = null;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
