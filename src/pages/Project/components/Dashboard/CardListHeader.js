import { bgColors } from "../../../../assets/bgColors";
import Modal from "../../../../components/Modals/Modal";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

export const CardListHeader = ({ index }) => {
  //modal open states
  const [tIsOpen, setTIsOpen] = useState(false);
  const [oIsOpen, setOIsOpen] = useState(false);
  const [dIsOpen, setDIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  //modal refs
  const headerRef = useRef();
  const modalRef = useRef();
  const group = useSelector((state) => state.project.projectGroups[index]);

  const { projectGroups, projectId } = useSelector((state) => state.project);
  const { updateDocument: updateProject } = useFirestore("projects");

  console.log(group.title);
  //open Input for editing title
  const editTitle = () => {
    setNewTitle(group && group.title);
    setTIsOpen(true);
  };
  //save on enter and button click
  const changeTitle = () => {
    const newGroups = structuredClone(projectGroups);
    newGroups[index].title = newTitle;
    updateProject(projectId, {
      groups: newGroups,
    });
    setTIsOpen(false);
  };
  //save color on click
  const changeColor = (bgColor) => {
    const newGroups = structuredClone(projectGroups);
    newGroups[index].bgColor = bgColor;
    updateProject(projectId, {
      groups: newGroups,
    });
    setOIsOpen(false);
  };
  //close edit when click outside
  useClickOutside(headerRef, () => {
    setTIsOpen(false);
  });
  useClickOutside(headerRef, () => {
    setOIsOpen(false);
  });
  //open modal to verify Delete
  const verifyDelete = () => {
    setOIsOpen(false);
    setDIsOpen(true);
  };
  //close modal when click outside
  useClickOutside(modalRef, () => {
    setDIsOpen(false);
  });
  //delete group including cards inside
  const deleteGroup = async () => {
    const newGroups = structuredClone(projectGroups);
    newGroups.splice(index, 1);
    updateProject(projectId, {
      groups: newGroups,
    });
    setDIsOpen(false);
  };
  return (
    <div
      ref={headerRef}
      className={`mb-2 flex w-60 px-2 py-1.5 text-white ${
        group && group.bgColor
      } relative rounded`}
    >
      {/*title*/}
      <p
        onClick={editTitle}
        className="cursor-pointer rounded px-1 hover:bg-white/20 "
      >
        {group && group.title}
      </p>
      {/*open input to edit title*/}
      {tIsOpen && (
        <div
          className={`absolute top-0 left-0 h-full w-full ${
            group && group.bgColor
          } rounded-lg shadow-lg`}
        >
          <div className="flex h-full w-full items-center justify-center">
            <input
              className="mx-1 w-full rounded bg-transparent px-2 py-1.5 text-white outline-none"
              autoFocus={true}
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onSubmit={changeTitle}
              onBlur={changeTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  changeTitle();
                }
              }}
            />
            {/*check button to save title*/}
            <button
              className="rounded px-2 py-1.5 text-white"
              onClick={changeTitle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/*card count*/}
      <div className="ml-2 flex items-center rounded bg-white/30 px-1.5 text-xs">
        {group && group.tasks && group.tasks.length ? group.tasks.length : 0}
      </div>
      {/*dots button to open options*/}
      <button
        onClick={() => setOIsOpen(true)}
        className="ml-auto hidden rounded p-0.5 hover:bg-white/30 group-hover:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
      {/*open options*/}
      {oIsOpen && (
        <div className={`absolute top-0 left-0 h-full w-full bg-white`}>
          {/*color palette*/}
          <div className="grid h-full w-full grid-cols-10 items-center ">
            {bgColors.map((bgColor, index) => (
              <div
                onClick={() => changeColor(bgColor)}
                key={index}
                className={` h-full cursor-pointer rounded ${bgColor}
                                        hover:opacity-80 ${
                                          index === 0 ? "" : "ml-[1px]"
                                        }`}
              ></div>
            ))}
            {/*button that opens verify delete modal*/}
            <button
              onClick={verifyDelete}
              className=" ml-[1px] flex h-full  items-center
                                    justify-center rounded bg-neutral-200 text-neutral-700 hover:bg-neutral-300 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
        </div>
      )}
      {/*modal to verify delete*/}
      <Modal open={dIsOpen}>
        <div
          ref={modalRef}
          className="flex w-80 flex-col items-center justify-center rounded bg-white p-6"
        >
          <h1 className="text-neutral-600">
            Are you sure? All Cards inside this Group will be deleted!
          </h1>
          <button
            onClick={deleteGroup}
            className="mt-6 w-full rounded border border-red-400 py-1 text-sm text-red-500
                                    hover:bg-red-100"
          >
            Delete
          </button>
          <button
            onClick={() => setDIsOpen(false)}
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
