import { useClickOutside } from "../../hooks/useClickOutside";
import ReactDOM from "react-dom";

export default function Modal({ children, open, modalRef }) {
  useClickOutside(modalRef, () => open(false));
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className=" fixed inset-0 z-50 flex flex cursor-pointer items-center justify-center bg-black/50">
      {children}
    </div>,
    document.getElementById("portal")
  );
}
