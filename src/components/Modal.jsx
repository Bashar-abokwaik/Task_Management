import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, children, buttonCaption }) {
  if (!isOpen) return null;

  return createPortal(
    <dialog open className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md">
      {children}
      <div className="mt-4 text-right">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
        >
          {buttonCaption}
        </button>
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
}
