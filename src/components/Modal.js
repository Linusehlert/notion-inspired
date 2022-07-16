import ReactDOM from "react-dom";

export default function Modal({children, open}) {
    if(!open) return null;

    return ReactDOM.createPortal(
        <div>
            {children}
        </div>,
        document.getElementById("portal")
    );
}