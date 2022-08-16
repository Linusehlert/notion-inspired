import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import Modal from "../../../components/Modals/Modal";

export const TaskHeader = ({ task }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { projectTitle } = useSelector((state) => state.project);

  const modalRef = useRef();

  const urlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const deleteTask = () => {};

  return (
    <div className="flex items-center p-2 text-sm">
      {/*Make View Full Screen*/}
      <button className="mr-2 rounded p-1 hover:bg-neutral-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </button>
      {/*path*/}
      <p className="font-normal">
        {projectTitle} /{" "}
        <span className="font-semibold text-neutral-700">
          {task && task.title}
        </span>
      </p>
      {/*options*/}
      <div className="ml-auto flex items-center">
        {/*Share*/}
        <button
          onClick={urlToClipboard}
          className="mr-2 rounded p-1 hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
        {/*Delete*/}
        <button
          onClick={() => setIsOpen(true)}
          className="rounded p-1 hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
      {copied && (
        <div className="absolute right-32 rounded bg-neutral-700 py-1 px-2 text-white">
          Copied Url to Clipboard
        </div>
      )}
      <Modal open={isOpen} setOpen={setIsOpen}>
        <div
          ref={modalRef}
          className="flex w-80 flex-col items-center justify-center rounded bg-white p-6"
        >
          <h1 className="text-neutral-600">
            Are you sure? The Task will be deleted! This action cannot be
            undone.
          </h1>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task);
            }}
            className="mt-6 w-full rounded border border-red-400 py-1 text-sm text-red-500
                                    hover:bg-red-100"
          >
            Delete
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-2 w-full rounded border border-neutral-300 py-1 text-sm
                                    hover:bg-neutral-100"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};
