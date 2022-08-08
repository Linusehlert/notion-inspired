import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFirestore } from "../../../hooks/firestore/useFirestore";
import { TaskTitle } from "../components/TaskTitle";
import { TaskLabel } from "../components/TaskLabel.";
import { TaskStatus } from "../components/TaskStatus";
import { TaskPriority } from "../components/TaskPriority";
import { TaskDescription } from "../components/TaskDescription";
import { TaskHeader } from "../components/TaskHeader";

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
    <div className="col fixed inset-0 z-30 flex flex cursor-text items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="relative z-50 h-5/6 w-[800px] rounded bg-white text-sm font-semibold text-neutral-500"
      >
        {/*top section*/}
        <div className="px-12 py-4">
          {/*header*/}
          <TaskHeader task={task} />
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
