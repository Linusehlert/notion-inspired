import ReactDOM from "react-dom";

export default function AlertModal({ children, open }) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-40 flex items-end justify-center ">
      {children}
    </div>,
    document.getElementById("portal")
  );
}
