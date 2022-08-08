import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { useClickOutside } from "../../../hooks/useClickOutside";
import Modal from "../../Modals/Modal";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

export const ProjectBlock = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();
  const { deleteDocument: deleteProject } = useFirestore("projects");
  //verify delete
  const handleOptions = () => {
    setIsOpen(true);
  };
  //close options when click outside
  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });

  return (
    <>
      <NavLink
        to={`/${project.id}`}
        key={project.id}
        className={({ isActive }) =>
          isActive
            ? `group relative flex items-center rounded px-2 py-1 font-semibold ` +
              `cursor-pointer bg-blue-500 text-white `
            : `group relative flex items-center rounded px-2 py-1 font-semibold text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700`
        }
      >
        <p className="ml-2">{project.title}</p>
        {/*options*/}
        <button
          onClick={handleOptions}
          className="z-99 absolute right-2 hidden rounded p-1 hover:hover:bg-white/40 group-hover:block"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm4 6a1 1 0 100 2h4a1 1 0 100-2H8z"
            />
          </svg>
        </button>
      </NavLink>
      <Modal open={isOpen}>
        <div
          ref={modalRef}
          className="flex w-80 flex-col items-center justify-center rounded bg-white p-6"
        >
          <h1 className="text-neutral-600">
            Are you sure? The Project will be deleted! This action cannot be
            undone.
          </h1>
          <button
            onClick={() => deleteProject(project.id)}
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
    </>
  );
};
