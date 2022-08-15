import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Modal from "../../../../components/Modals/Modal";
import { useSelector } from "react-redux";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { useFirestore } from "../../../../hooks/firestore/useFirestore";

export const Card = ({ task, groupIndex }) => {
  const [color, setColor] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { projectGroups, projectId } = useSelector((state) => state.project);
  const location = useLocation();

  const modalRef = useRef();

  const { updateDocument: updateProject } = useFirestore("projects");

  const deleteTask = () => {
    console.log("delete task");
    const newGroups = structuredClone(projectGroups);
    const newGroup = structuredClone(newGroups[groupIndex]);
    console.log(groupIndex);
    let newTasks = structuredClone(newGroup.tasks);
    newTasks = newTasks.filter((t) => t.id !== task.id);
    newGroup.tasks = newTasks;
    newGroups[groupIndex] = newGroup;
    updateProject(projectId, {
      groups: newGroups,
    });
    setIsOpen(false);
  };

  useClickOutside(modalRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    if (task) {
      switch (task.priority) {
        case "Low":
          setColor("bg-green-100 text-green-500");
          break;
        case "Mid":
          setColor("bg-yellow-100 text-yellow-600");
          break;
        case "High":
          setColor("bg-red-100 text-red-600");
          break;
        case "None":
          setColor("bg-indigo-100 text-indigo-500");
          break;
        default:
          setColor("bg-indigo-100 text-indigo-500");
      }
    }
  }, [task]);
  return (
    <Link
      to={`${task.id}?view=center`}
      state={{ background: location }}
      className="border-neutral-150 group-1 relative mb-2 flex w-60 cursor-pointer flex-col rounded-lg border bg-white
        py-2 px-3 shadow-md hover:bg-neutral-100 "
    >
      {/*Labels*/}
      <h5 className="flex items-center font-normal text-neutral-400">
        {task &&
          task.labels &&
          task.labels
            .slice(0, 4)
            .map((label, index) => (
              <span key={label}>
                {`${index === 0 ? "" : "/"}${index !== 3 ? label : "..."}`}{" "}
              </span>
            ))}
      </h5>
      {/*Title*/}
      <h3 className="mb-2 text-base font-bold text-neutral-700">
        {task && task.title}
      </h3>
      {/*Description*/}
      {task && task.description?.trim() !== "" && (
        <p className="mb-3 font-normal text-neutral-500">
          {task.description?.substring(0, 50) + "..."}
        </p>
      )}
      <div className="mb-1 flex items-center">
        {/*Assignees*/}
        {task &&
          task.assignees &&
          task.assignees.slice(0, 3).map((assignee) =>
            assignee.photoUrl ? (
              <img
                key={assignee.id}
                src={assignee.photoUrl}
                alt={assignee.displayName}
                className="mr-2 h-5 w-5 rounded-full"
              />
            ) : (
              <div
                key={assignee.id}
                className="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs
              "
              >
                <span className="text-center text-white">
                  {assignee.displayName && assignee.displayName[0]}
                </span>
              </div>
            )
          )}
        {/*Priority*/}
        <div className={`${color} rounded  px-1.5 py-0.5 text-xs`}>
          {task && task.priority?.length && task.priority}
        </div>
      </div>
      {/*Delete Button*/}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.cancelBubble = true;
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="absolute right-2.5 top-2.5 z-20 hidden rounded p-0.5 hover:bg-neutral-200 group-1-hover:block"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/*Verify Delete*/}
      <Modal open={isOpen} setOpen={setIsOpen}>
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          ref={modalRef}
          className="flex w-80 flex-col items-center justify-center rounded bg-white p-6"
        >
          <h1 className="text-neutral-600">
            Are you sure? The Task can not be restored!
          </h1>
          <button
            onClick={deleteTask}
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
      {/*comments*/}
      {/*<div className="mt-2 flex items-center">*/}
      {/*  <svg*/}
      {/*    xmlns="http://www.w3.org/2000/svg"*/}
      {/*    className="mr-1 h-4 w-4"*/}
      {/*    fill="none"*/}
      {/*    viewBox="0 0 24 24"*/}
      {/*    stroke="currentColor"*/}
      {/*    strokeWidth="2"*/}
      {/*  >*/}
      {/*    <path*/}
      {/*      strokeLinecap="round"*/}
      {/*      strokeLinejoin="round"*/}
      {/*      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"*/}
      {/*    />*/}
      {/*  </svg>*/}
      {/*  <p className="text-xs text-neutral-500">*/}
      {/*    {task && task.comments.length}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </Link>
  );
};
