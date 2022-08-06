import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestore } from "../../hooks/firestore/useFirestore";
import { TaskTitle } from "../../pages/Task/components/TaskTitle";
import { TaskLabel } from "../../pages/Task/components/TaskLabel.";
import { TaskStatus } from "../../pages/Task/components/TaskStatus";
import { TaskPriority } from "../../pages/Task/components/TaskPriority";
import { TaskDescription } from "../../pages/Task/components/TaskDescription";

export const TaskModal = ({ task, taskIndex, groupIndex }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const { projectTitle, projectGroups, projectId } = useSelector(
    (state) => state.project
  );

  const modalRef = useRef();

  const { updateDocument: updateProject } = useFirestore("projects");

  const { pathname } = useLocation();
  const id = pathname.substring(0, pathname.lastIndexOf("/"));
  const navigate = useNavigate();

  const updateTask = (newTask) => {
    const newGroups = structuredClone(projectGroups);
    let newGroup = structuredClone(newGroups[groupIndex]);
    const newTasks = structuredClone(newGroup.tasks);
    newTasks[taskIndex] = newTask;
    newGroups[groupIndex] = { ...newGroup, tasks: newTasks };
    console.log(newGroups);
    updateProject(projectId, {
      groups: newGroups,
    });
  };
  // close modal when click outside
  useClickOutside(modalRef, () => {
    setTimeout(() => {
      navigate(id, { replace: true });
    }, 10);
  });

  return ReactDOM.createPortal(
    <div className="col fixed inset-0 z-50 flex flex cursor-text items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="h-5/6 w-[800px] rounded bg-white text-sm font-semibold text-neutral-500"
      >
        {/*top section*/}
        <div className="px-12 py-4">
          {/*header*/}
          <div className="flex items-center p-2 text-sm  ">
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
              <button className="mr-2 rounded p-1 hover:bg-neutral-200">
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
              <button className="rounded p-1 hover:bg-neutral-200">
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
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/*title*/}
          <TaskTitle task={task} updateTask={updateTask} />
          {/*properties*/}
          <div className=" flex flex-col p-2 text-sm text-neutral-500">
            {/*Label*/}
            <TaskLabel task={task} updateTask={updateTask} />
            {/*Assignee*/}
            <div className="mb-1 flex">
              {/*property*/}
              <div className="flex w-40 cursor-pointer items-center rounded py-1 px-1  hover:bg-neutral-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <p className="ml-2 ">Assignees</p>
              </div>
              {/*value*/}
              <div className="ml-2 flex w-full cursor-pointer items-center rounded px-2 py-1 font-semibold text-neutral-700 hover:bg-neutral-200">
                {task && task.assignees && task.assignees[0].name}
              </div>
            </div>
            {/*Status*/}
            <TaskStatus
              task={task}
              groupIndex={groupIndex}
              taskIndex={taskIndex}
            />
            {/*Priority*/}
            <TaskPriority task={task} updateTask={updateTask} />
          </div>
        </div>
        {/*text section header*/}
        <ul className="border-neutral-150 flex items-center border-b px-14 text-neutral-500">
          <li
            className={`mx-1 cursor-pointer pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500 
          ${commentsOpen ? "" : "border-b-2 border-blue-500 text-blue-500"}`}
          >
            Description
          </li>
          <li
            className={`group ml-8 flex cursor-pointer border-b-2 pb-2 hover:border-b-2 hover:border-blue-500 hover:text-blue-500
          ${commentsOpen ? " border-blue-500 text-blue-500" : "border-white"}`}
          >
            Comments
            {/*comment count*/}
            <div
              className={`ml-2 flex items-center rounded px-1.5 text-xs group-hover:bg-blue-100 ${
                commentsOpen ? "bg-blue-100" : "bg-neutral-200"
              }`}
            >
              {task && task.comments && task.comments.length}
            </div>
          </li>
        </ul>
        {/*text section*/}
        <TaskDescription task={task} updateTask={updateTask} />
      </div>
    </div>,
    document.getElementById("portal")
  );
};
